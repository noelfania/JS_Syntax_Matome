## Accessing files
// store a reference to our file handle
let fileHandle;
async function getFile() {
  // open file picker
  [fileHandle] = await window.showOpenFilePicker();

  if (fileHandle.kind === 'file') {
    // run file code
  } else if (fileHandle.kind === 'directory') {
    // run directory code
  }

}


 ##  once a file is chosen, uses the getFile() method to retrieve the contents.
const pickerOpts = {
    types: [
      {
        description: 'Images',
        accept: {
          'image/*': ['.png', '.gif', '.jpeg', '.jpg']
        }
      },
    ],
    excludeAcceptAllOption: true,
    multiple: false
  };
  
  async function getTheFile() {
    // open file picker
    [fileHandle] = await window.showOpenFilePicker(pickerOpts);
  
    // get file contents
    const fileData = await fileHandle.getFile();
  }


## Accessing directories
const dirName = 'directoryToGetName';
// assuming we have a directory handle: 'currentDirHandle'
const subDir = currentDirHandle.getDirectoryHandle(dirName, {create: true});

### resolve() to find the path to a chosen file, relative to a specified directory handle.
async function returnPathDirectories(directoryHandle) {

    // Get a file handle by showing a file picker:
    const [handle] = await self.showOpenFilePicker();
    if (!handle) {
      // User cancelled, or otherwise failed to open a file.
      return;
    }
  
    // Check if handle exists inside directory our directory handle
    const relativePaths = await directoryHandle.resolve(handle);
  
    if (relativePaths === null) {
      // Not inside directory handle
    } else {
      // relativePaths is an array of names, giving the relative path
  
      for (const name of relativePaths) {
        // log each entry
        console.log(name);
      }
    }
  }

## Writing to files
async function saveFile() {

    // create a new handle
    const newHandle = await window.showSaveFilePicker();
  
    // create a FileSystemWritableFileStream to write to
    const writableStream = await newHandle.createWritable();
  
    // write our file
    await writableStream.write(imgBlob);
  
    // close the file and write the contents to disk.
    await writableStream.close();
  }

  