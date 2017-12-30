/**
 * Created by HOZ on 07/09/2017.
 */
import { PERMISSIONS, PERMISSION_CATEGORIES } from './common_defs'
import state from './state'
import ArrayUtil from '../utils/ArrayUtil'

function _Util () {
}
_Util.prototype.getUserName = function (userId) {
  for (var i = 0, len = state.allUser.length; i < len; i++) {
    if (state.allUser[i]._id === userId) {
      return state.allUser[i].name
    }
  }
  return ''
}
_Util.prototype.getUserNames = function (userIds) {
  var name = []
  for (var i = 0, len = state.allUser.length; i < len; i++) {
    if (ArrayUtil.in_array(state.allUser[i]._id, userIds)) {
      name.push(state.allUser[i].name)
    }
  }
  return name
}
_Util.prototype.getRoleName = function (roleId) {
  for (var i = 0, len = state.allRole.length; i < len; i++) {
    if (state.allRole[i]._id === roleId) {
      return state.allRole[i].name
    }
  }
  return ''
}
_Util.prototype.getRoleNames = function (roleIds) {
  var name = []
  for (var i = 0, len = state.allRole.length; i < len; i++) {
    if (ArrayUtil.in_array(state.allRole[i]._id, roleIds)) {
      name.push(state.allRole[i].name)
    }
  }
  return name
}
_Util.prototype.getRoleId = function (roleName) {
  for (var i = 0, len = state.allRole.length; i < len; i++) {
    if (state.allRole[i].name === roleName) {
      return state.allRole[i]._id
    }
  }
  return ''
}
_Util.prototype.getDutyName = function (dutyId) {
  for (var i = 0, len = state.allDuty.length; i < len; i++) {
    if (state.allDuty[i]._id === dutyId) {
      return state.allDuty[i].name
    }
  }
  return ''
}
_Util.prototype.getDutyDescr = function (dutyId) {
  for (var i = 0, len = state.allDuty.length; i < len; i++) {
    if (state.allDuty[i]._id === dutyId) {
      return state.allDuty[i].descr
    }
  }
  return ''
}
_Util.prototype.getRoleById = function (roleId) {
  for (var i = 0, len = state.allRole.length; i < len; i++) {
    if (state.allRole[i]._id === roleId) {
      return state.allRole[i]
    }
  }
  return null
}
_Util.prototype.getDutiesByRoleId = function (roleId) {
  var duties = []
  for (var i = 0, len = state.allDuty.length; i < len; i++) {
    if (ArrayUtil.in_array(roleId, state.allDuty[i].roles)) {
      duties.push(state.allDuty[i])
    }
  }
  return duties
}
_Util.prototype.getDutyCategoryNameById = function (catId) {
  for (var i = 0, len = state.allDutyCategory.length; i < len; i++) {
    if (state.allDutyCategory[i]._id === catId) {
      console.log('get name:')
      return state.allDutyCategory[i].name
    }
  }
  return ''
}
_Util.prototype.getPermissionIdByName = function (name, allPermission) {
  var keys = Object.keys(allPermission)
  for (var i = 0; i < keys.length; i++) {
    var perms = allPermission[keys[i]].permissions
    for (var j = 0; j < perms.length; j++) {
      if (perms[j].name === name) {
        return perms[j].id
      }
    }
  }
  return ''
}
_Util.prototype.getPermissionRoleByName = function (name) {
  for (var i = 0; i < state.allPermissionRole.length; i++) {
    if (name === state.allPermissionRole[i].name) {
      return state.allPermissionRole[i]
    }
  }
  return null
}
_Util.prototype.getPermissionRoleById = function (id) {
  for (var i = 0; i < state.allPermissionRole.length; i++) {
    if (id === state.allPermissionRole[i]._id) {
      return state.allPermissionRole[i]
    }
  }
  return null
}
_Util.prototype.hasPermission = function (permission) {
  var permissionid = PERMISSIONS[permission]
  var roleids = state.user.role
  for (var i = 0; i < state.allRole.length; i++) {
    var role = state.allRole[i]
    if (ArrayUtil.in_array(role._id, roleids)) {
      var permissionRoles = role.permissionRoles
      for (var j = 0; j < permissionRoles.length; j++) {
        var permissionRole = this.getPermissionRoleById(permissionRoles[j])
        if (permissionRole) {
          for (var k = 0; k < permissionRole.permissions.length; k++) {
            if (permissionRole.permissions[k] === permissionid) {
              // console.log('return true:' + permission)
              return true
            }
          }
        }
      }
    }
  }
  // console.log('return false:' + permission)
  return false
}
_Util.prototype.hasCategoryPermission = function (categoryname) {
  var categoryid = PERMISSION_CATEGORIES[categoryname]
  if ((categoryid === 'C_004' || categoryid === 'C_002') && state.user._id === 'admin') {
    return true
  }
  var roleids = state.user.role
  var permissionList = state.allPermission[categoryid] === undefined ? [] : state.allPermission[categoryid].permissions
  for (var i = 0; i < state.allRole.length; i++) {
    var role = state.allRole[i]
    if (ArrayUtil.in_array(role._id, roleids)) {
      var permissionRoles = role.permissionRoles
      for (var j = 0; j < permissionRoles.length; j++) {
        var permissionRole = this.getPermissionRoleById(permissionRoles[j])
        if (permissionRole) {
          for (var k = 0; k < permissionRole.permissions.length; k++) {
            for (var m = 0; m < permissionList.length; m++) {
              if (permissionRole.permissions[k] === permissionList[m].id) {
                // console.log('return true:' + categoryname)
                return true
              }
            }
          }
        }
      }
    }
  }
  // console.log('return false:' + categoryname)
  return false
}
_Util.prototype.getLocationDisplay = function (locationX, locationY) {
  return '园内'
}
var Util = new _Util()
export default Util
