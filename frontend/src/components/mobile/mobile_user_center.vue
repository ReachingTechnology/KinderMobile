<template>
  <div align="center">
    <br/>
    <mu-avatar slot="center" :size="100" @click="onAddPicture" :src="avatarUrl">
      <mu-icon :value="avatarIcon" v-show="avatarUrl === ''"/>
    </mu-avatar>
    <br/>
    <mu-text-field :disabled="true" label="编号" v-model="currentUser._id" labelFloat/>
    <br/>
    <mu-text-field :disabled="true" label="姓名" v-model="currentUser.name" labelFloat/>
    <br/>
    <mu-text-field :disabled="true" label="岗位" v-model="currentUser.roleName" labelFloat/>
    <br/>
    <div>
      <mu-raised-button style="display:inline-block" size="normal" label="修改密码" @click.native="handleChgPass" primary/>
      <mu-raised-button style="display:inline-block" size="normal" label="退出登录" @click.native="handleLogout"/>
    </div>
    <mu-dialog :open="askLogout" title="退出" @close="closeLogoutDialog">
      确认退出系统？
      <mu-flat-button slot="actions" @click="closeLogoutDialog" primary label="取消"/>
      <mu-flat-button slot="actions" primary @click="logout" label="确定"/>
    </mu-dialog>
    <mu-bottom-sheet :open="openActionSheet" @close="closeActionSheet">
      <mu-list @itemClick="closeActionSheet">
        <mu-list-item title="拍照" @click="onAddFromCamera"/>
        <mu-list-item title="从相册里选取" @click="onAddFromAlbum"/>
        <mu-list-item title="取消"/>
      </mu-list>
    </mu-bottom-sheet>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { USER_LOGOUT, GET_CURRENT_USER, CHANGE_APP_TITLE, SET_ROOT_VIEW, SET_USER_AVATAR, UPLOAD_FILES } from '../../store/mutation_types'
  import ObjUtil from '../../utils/ObjUtil'
  import Util from '../../store/utils'
  import FileUtil from '../../utils/FileUtil'
  import dateUtil from '../../utils/DateUtil'

  export default {
    name: 'app',
    components: {
    },
    created: function () {
      var filename = this.user._id + '_avatar.jpg'
      var hh = this
      FileUtil.checkFileExist(cordova.file.externalDataDirectory, filename, function (exist) {
        if (exist) {
          hh.localImgFileExist = 1
        } else {
          hh.localImgFileExist = 0
        }
        hh.avatarUrl = hh.getCurrentAvatarUrl()
      })
    },
    computed: {
      ...mapGetters(['user', 'backend_uri', 'upload_uri']),
      currentUser () {
        var data = {}
        data = ObjUtil.clone(this.user)
        data.roleName = Util.getRoleNames(this.user.role)
        data.avatar = this.user.avatar === undefined ? {} : this.user.avatar
        return data
      }
    },
    data: () => {
      return {
        askLogout: false,
        avatarIcon: 'people',
        openActionSheet: false,
        localImgFileExist: -1,
        avatarUrl: ''
      }
    },
    beforeRouteEnter: function (to, from, next) {
      next(vm => {
        vm.CHANGE_APP_TITLE('个人中心')
        vm.SET_ROOT_VIEW(true)
        vm.avatarUrl = vm.getCurrentAvatarUrl()
      })
    },
    beforeRouteLeave: function (to, from, next) {
      this.SET_ROOT_VIEW(false)
      next()
    },
    methods: {
      handleLogout () {
        this.askLogout = true
      },
      closeLogoutDialog () {
        this.askLogout = false
      },
      logout () {
        this.askLogout = false
        this.USER_LOGOUT()
        this.$router.push({ name: 'userLogin' })
      },
      handleChgPass () {
        this.$router.push({name: 'changePass'})
      },
      getCurrentAvatarUrl () {
        console.log('file exist:', this.localImgFileExist)
        console.log('current avatar', this.currentUser.avatar)
        if (this.currentUser.avatar.localUri !== '' && this.localImgFileExist !== 0) {
          return this.currentUser.avatar.localUri
        } else {
          return this.currentUser.avatar.remoteUri
        }
      },
      setOptions (srcType) {
        var options = {
          // Some common settings are 20, 50, and 100
          quality: 100,
          destinationType: Camera.DestinationType.FILE_URI,
          // In this app, dynamically set the picture source, Camera or photo gallery
          sourceType: srcType,
          encodingType: Camera.EncodingType.JPEG,
          mediaType: Camera.MediaType.PICTURE,
          saveToPhotoAlbum: true,
          allowEdit: true,
          correctOrientation: true  //Corrects Android orientation quirks
        }
        return options;
      },
      uploadAvatar (fileEntry) {
        var hh = this
        fileEntry.file(function (file) {
          var reader = new FileReader();
          reader.onloadend = function() {
            // Create a blob based on the FileReader "result", which we asked to be retrieved as an ArrayBuffer
            var form = new FormData()
            var blob = new Blob([new Uint8Array(this.result)], { type: "image/png" });
            console.log('new blob', this.result, '$', blob)
            form.append("blob", blob, fileEntry.name)
            var oReq = new XMLHttpRequest();
            oReq.open("POST", hh.upload_uri, true)
            oReq.onload = function () {
              // all done!
              console.log('upload done:', oReq.response)
              var result = JSON.parse(oReq.response)
              if(result.data.status === 0){
                hh.currentUser.avatar.remoteUri = hh.backend_uri + '/' + result.data.fileurl
                console.log('the remote url of uploaded file:', hh.currentUser.avatar.remoteUri)
                var param = {_id: hh.user._id}
                param.avatar = hh.currentUser.avatar
                hh.SET_USER_AVATAR(param)
                hh.avatarUrl = hh.getCurrentAvatarUrl()
              }
            };
            // Pass the blob in to XHR's send method
            oReq.send(form);
          };
          // Read the file as an ArrayBuffer
          reader.readAsArrayBuffer(file);
        }, function (err) { console.error('error getting fileentry file!' + err); })
      },
      onAddPicture () {
        this.openActionSheet = true
      },
      onPictureTaken (imageUri) {
        var pos0 = imageUri.lastIndexOf('?')
        var fullFilename = imageUri
        if (pos0 >= 0) {
          fullFilename = imageUri.substr(0, imageUri.lastIndexOf('?'))
        }
        var pos = fullFilename.lastIndexOf('/')
        var path = fullFilename.substr(0, pos)
        var filename = fullFilename.substr(pos + 1);
        FileUtil.getFileEntry(path, filename, this.onOriginalFilePicked, this.onOriginalFilePickFailed)
      },
      onOriginalFilePicked (fileEntry) {
        var filename = this.user._id + '_avatar.jpg'
        FileUtil.moveFile(fileEntry, cordova.file.externalDataDirectory, filename, {}, this.setAvatar)
      },
      onOriginalFilePickFailed (error) {
        console.error(error)
      },
      setAvatar (fileEntry, params) {
        var avatar = {}
        avatar.localUri = fileEntry.toInternalURL()
        avatar.remoteUri = ''
        avatar.createTime = dateUtil.getNow()
        this.currentUser.avatar = avatar
        console.log('get avatar object:', this.currentUser.avatar)
        this.avatarUrl = ''
        this.uploadAvatar(fileEntry)
      },
      onAddFromCamera () {
        var srcType = Camera.PictureSourceType.CAMERA;
        var options = this.setOptions(srcType);
        var func = this.onPictureTaken

        navigator.camera.getPicture(function cameraSuccess(imageUri) {
          func(imageUri);

        }, function cameraError(error) {
          console.debug("Unable to obtain picture: " + error, "app");

        }, options);
      },
      onAddFromAlbum () {
        var srcType = Camera.PictureSourceType.PHOTOLIBRARY;
        var options = this.setOptions(srcType);
        var func = this.onPictureTaken;

        navigator.camera.getPicture(function cameraSuccess(imageUri) {
          func(imageUri);
        }, function cameraError(error) {
          console.debug("Unable to obtain picture: " + error, "app");

        }, options);
      },
      closeActionSheet () {
        this.openActionSheet = false
      },
//      beforeAvatarUpload (file) {
//        const isJPG = file.type === 'image/jpeg'
//        const isLt2M = file.size / 1024 / 1024 < 2
//
//        if (!isJPG) {
//          this.$message.error('Avatar picture must be JPG format!')
//        }
//        if (!isLt2M) {
//          this.$message.error('Avatar picture size can not exceed 2MB!')
//        }
//        return isJPG && isLt2M
//      },
      ...mapActions([GET_CURRENT_USER, CHANGE_APP_TITLE, USER_LOGOUT, SET_ROOT_VIEW, SET_USER_AVATAR, UPLOAD_FILES])
    }
  }
</script>
<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
