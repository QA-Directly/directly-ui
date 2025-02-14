import { useState } from "react";
import { Search, SendHorizonal } from "lucide-react";
import user from "../../assets/occupations/plumber.png";

function ManageUsers() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  const [friends, setFriends] = useState([
    {
      name: "Mr. Andrew",
      messages: [
        {
          text: "Can I come tomorrow?",
          sender: "Mr. Andrew",
          time: "10:30 AM",
        },
        {
          text: "I'll be free in the afternoon.",
          sender: "You",
          time: "10:35 AM",
        },
        {
          text: "Looking forward to seeing you",
          sender: "Mr.Andrew",
          time: "10:35 AM",
        },
      ],
    },
    {
      name: "Mr. Nedu",
      messages: [
        {
          text: "What time will you like me to come?",
          sender: "Mr. Nedu",
          time: "11:15 AM",
        },
        {
          text: "Around 2 PM works best for me.",
          sender: "You",
          time: "11:20 AM",
        },
      ],
    },
  ]);

  const handleChatSelect = (friend) => {
    setSelectedChat(friend);
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const message = {
      text: newMessage,
      sender: "You",
      time: currentTime,
    };

    const updatedFriends = friends.map((friend) =>
      friend.name === selectedChat.name
        ? { ...friend, messages: [...friend.messages, message] }
        : friend
    );

    setFriends(updatedFriends);
    setSelectedChat({
      ...selectedChat,
      messages: [...selectedChat.messages, message],
    });

    setNewMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="flex flex-row w-full h-screen">
      {/* Sidebar with chat list */}
      <div className="flex flex-col bg-white w-1/5 p-4">
        <div className="p-2 border-2 rounded-lg flex justify-center items-center">
          <input
            type="search"
            placeholder="Search..."
            className="w-full h-full p-2 outline-none"
          />
          <Search />
        </div>
        <div className="flex flex-col gap-4 pt-8">
          {friends.map((friend, index) => (
            <div
              key={index}
              className={`p-2 border rounded-lg shadow-md flex flex-row justify-center items-center gap-4 hover:bg-ash hover:shadow-inner cursor-pointer ${
                selectedChat?.name === friend.name ? "bg-ash" : ""
              }`}
              onClick={() => handleChatSelect(friend)}
            >
              <img src={user} className="w-12 h-12 rounded-full" alt="" />
              <div>
                <h2 className="font-bold">{friend.name}</h2>
                <p className="text-xs">
                  {friend.messages[friend.messages.length - 1].text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Section */}
      <div className="w-4/5 bg-ash flex flex-col relative">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <section className="flex flex-row justify-start gap-8 items-center w-full p-4 bg-[#d9d9d9] shadow">
              <img src={user} className="w-16 h-16 rounded-full" alt="" />
              <h2 className="font-bold text-xl">{selectedChat.name}</h2>
            </section>

            {/* Chat Messages */}
            <div className=" overflow-y-auto p-4">
              {selectedChat.messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex mb-4 ${
                    msg.sender === "You" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      msg.sender === "You"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <p className="text-xs mt-1 opacity-70">{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Floating Message Input */}
            <div className="fixed bottom-4 left-1/2 right-1/2  w-1/3 p-2 m-auto bg-white rounded-lg  flex items-center">
              <input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                type="text"
                placeholder="Type message here..."
                className="w-full p-2 rounded-lg outline-none"
              />
              <button
                onClick={sendMessage}
                className="ml-2 bg-gold text-primary p-2 rounded-lg"
              >
                <SendHorizonal />
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a chat to begin
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageUsers;
