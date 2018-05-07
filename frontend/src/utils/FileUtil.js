/**
 * Created by HOZ on 07/03/2018.
 */
import state from '../store/state'
import axios from 'axios'

function _FileUtil () {
}

_FileUtil.prototype.createNewImgFileEntry = function (repo, fileName, imgUri, onCreateCallback) {
  console.log('create file by uri:' + imgUri)
  window.resolveLocalFileSystemURL(repo, function success(dirEntry) {
    // JPEG file
    dirEntry.getFile(fileName, { create: true, exclusive: false }, function (fileEntry) {
      _FileUtil.prototype.writeFile(fileEntry, imgUri, onCreateCallback);
    }, _FileUtil.prototype.onErrorCreateFile)

  }, this.onErrorResolveUrl)
}

_FileUtil.prototype.getFileEntry = function (path, fileName, succCallback, failCallback) {
  console.log('get file entry',  path, fileName)
  window.resolveLocalFileSystemURL(path, function success(dirEntry) {
    // JPEG file
    dirEntry.getFile(fileName, { create: false, exclusive: false }, function (fileEntry) {
      console.log("got file: " + fileEntry)
      succCallback(fileEntry)
    }, failCallback)

  }, this.onErrorResolveUrl)
}

_FileUtil.prototype.getCdvFileEntry = function (fileName, params, succCallback, failCallback) {
  window.resolveLocalFileSystemURL(fileName, function success(fileEntry) {
    console.log('got file', fileEntry)
    succCallback(fileEntry, params)
  }, failCallback)
}

_FileUtil.prototype.checkFileExist = function (path, filename, callback) {
  window.resolveLocalFileSystemURL(path, function success(dirEntry) {
    // JPEG file
    dirEntry.getFile(filename, { create: false, exclusive: false }, function (fileEntry) {
      callback(true)
    }, function (err) {callback(false)})
  }, this.onErrorResolveUrl)

}

_FileUtil.prototype.moveFile = function (fileEntry, newDir, newName, params, callback ) {
  window.resolveLocalFileSystemURL(newDir, function success(dirEntry) {
    fileEntry.moveTo(dirEntry, newName, function (fileEntry) {
      callback(fileEntry, params)
    }, function(err){
      console.log('move file failed:', fileEntry.name, newDir, newName, err)
    })
    }, this.onErrorResolveUrl)
}

_FileUtil.prototype.onErrorCreateFile = function (error) {
  console.error(error)
}
_FileUtil.prototype.onErrorGetFile = function (error) {
  console.error(error)
}
_FileUtil.prototype.onErrorResolveUrl = function () {
  console.log('error resolve url:')
}

_FileUtil.prototype.writeFile = function(fileEntry, dataObj, onCreateCallback) {
  // Create a FileWriter object for our FileEntry (log.txt).
  fileEntry.createWriter(function (fileWriter) {

    fileWriter.onwriteend = function() {
      console.log("Successful file write...", fileEntry)
      onCreateCallback(fileEntry)
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

var fileUtil = new _FileUtil()
export default fileUtil
