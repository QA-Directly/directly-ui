import React, { useState, useRef } from "react";
import { Upload } from "lucide-react";

function FileUpload() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  return (
    <div className="w-4/5 bg-white flex flex-col p-4 mt-10 rounded-lg border-2 mb-10 m-auto">
      {/* Header */}
      <h2 className="text-xl font-semibold mb-6">Upload Videos and Images</h2>

      {/* Image Grid */}
      {selectedFiles.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {selectedFiles.map((file, index) => (
            <div key={index} className="relative aspect-square">
              <img
                src={URL.createObjectURL(file)}
                alt={`Upload ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      )}

      {/* Upload Area */}
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center text-center">
          <Upload size={48} className="text-gray-400 mb-4" />
          <h3 className="text-lg font-medium mb-2">Upload Videos and Images</h3>
          <p className="text-gray-500 text-sm mb-4">
            Drag and drop files here or click to browse
          </p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
            multiple
            accept="image/*,video/*"
          />
          <button
            onClick={() => fileInputRef.current.click()}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Upload Content
          </button>
        </div>
      </div>

      {/* Upload Button */}
      {selectedFiles.length > 0 && (
        <div className="flex justify-end">
          <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
            Upload Content
          </button>
        </div>
      )}
    </div>
  );
}

export default FileUpload;
