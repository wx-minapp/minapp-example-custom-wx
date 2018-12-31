import {wxp} from './wxp/'

async function test() {
  let res = await wxp.getUserInfo()
  console.log(res.userInfo.avatarUrl)
}
