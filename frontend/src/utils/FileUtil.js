/**
 * Created by HOZ on 07/03/2018.
 */
import state from '../store/state'

function _FileUtil () {
}

_FileUtil.prototype.createNewImgFileEntry = function (repo, path, fileName, imgUri) {
  console.log('create file by uri:' + imgUri)
  var completePath = repo
  console.log(completePath)
  window.resolveLocalFileSystemURL(completePath, function success(dirEntry) {

    console.log(dirEntry)
    // JPEG file
    dirEntry.getFile(fileName, { create: true, exclusive: false }, function (fileEntry) {
      _FileUtil.prototype.writeFile(fileEntry, imgUri);
      console.log("got file: " + fileEntry.fullPath)

    }, _FileUtil.prototype.onErrorCreateFile)

  }, this.onErrorResolveUrl)
}

_FileUtil.prototype.onErrorCreateFile = function (error) {
  console.error(error)
}

_FileUtil.prototype.onErrorResolveUrl = function () {
  console.log('error resolve url:')
}

_FileUtil.prototype.writeFile = function(fileEntry, dataObj) {
  // Create a FileWriter object for our FileEntry (log.txt).
  fileEntry.createWriter(function (fileWriter) {

    fileWriter.onwriteend = function() {
      console.log("Successful file write...")
      // _FileUtil.prototype.readFile(fileEntry)
    }

    fileWriter.onerror = function (e) {
      console.log("Failed file write: " + e.toString())
    }

    // If data object is not passed in,
    // create a new Blob instead.
    if (!dataObj) {
      dataObj = new Blob(['some file data'], { type: 'text/plain' })
    }

    fileWriter.write(dataObj)
  })
}

_FileUtil.prototype.readFile = function(fileEntry) {

  fileEntry.file(function (file) {
    var reader = new FileReader()

    reader.onloadend = function() {
      console.log("Successful file read: " + this.result)
      // displayFileData(fileEntry.fullPath + ": " + this.result)
    }

    reader.readAsText(file)

  }, _FileUtil.prototype.onErrorReadFile)
}

_FileUtil.prototype.onErrorReadFile = function(error) {
  console.log('error read file:', error)
}

_FileUtil.prototype.upload = function (fileUrl, onFileUploadSuccess, onFileUploadFail) {
  console.log('going to upload image')
  xhr('POST', state.upload_uri, '', fileUrl, onFileUploadSuccess, onFileUploadFail, false)
}


var fileUtil = new _FileUtil()
export default fileUtil
