<template>
  <div class="main">
    <div class="title">
      <a class="active" href="/login">登录</a>
      <span>·</span>
      <a href="/register">注册</a>
    </div>
    <div class="sign-up-container">
      <el-form ref="userForm" :model="user">
        <el-form-item
          :rules="[
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { validator: checkPhone, trigger: 'blur' },
          ]"
          class="input-prepend restyle"
          prop="mobile"
        >
          <div>
            <el-input v-model="user.mobile" type="text" placeholder="手机号" />
            <i class="iconfont icon-phone" />
          </div>
        </el-form-item>
        <el-form-item
          :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]"
          class="input-prepend"
          prop="password"
        >
          <div>
            <el-input
              v-model="user.password"
              type="password"
              placeholder="密码"
            />
            <i class="iconfont icon-password" />
          </div>
        </el-form-item>
        <div class="btn">
          <input
            type="button"
            class="sign-in-button"
            value="登录"
            @click="submitLogin()"
          />
        </div>
      </el-form>
      <!-- 更多登录方式 -->
      <div class="more-sign">
        <h6>社交帐号登录</h6>
        <ul>
          <li>
            <a
              id="weixin"
              class="weixin"
              target="_blank"
              href="http://qy.free.idcfengye.com/api/ucenter/weixinLogin/login"
              ><i class="iconfont icon-weixin"
            /></a>
          </li>
          <li>
            <a id="qq" class="qq" target="_blank" href="#"
              ><i class="iconfont icon-qq"
            /></a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import "~/assets/css/sign.css";
import "~/assets/css/iconfont.css";
import cookie from "js-cookie";
import loginApi from "@/api/login";

export default {
  layout: "sign",
  data() {
    return {
      user: {
        // 封装用于登录的用户对象
        mobile: "",
        password: "",
      },
      // 用于获取接口传来的token中的对象
      loginInfo: {},
    };
  },
  methods: {
    // 登陆的方法
    submitLogin() {
      // 第一步，调用接口进行登陆，返回 token 字符串
      loginApi.submitLoginUser(this.user).then((response) => {
        //=========前后端校验参数=========
        if (response.data.code === 20001) {
          //提示登录失败
          this.$message({
            type: "error",
            message: response.data.message,
          });
        } else {
          // 第二步，将 token 放到 cookie 中
          // 第1个是cookie名称，第2个是参数值，第3个是参数作用范围
          cookie.set("guli_token", response.data.data.token, {
            domain: "localhost",
          });
          // 第三步，创建拦截器（代码在request.js中）
          // 第四步，调用接口根据 token 获取用户信息，用于页面显示
          loginApi.getLoginUserInfo().then((response) => {
            // 获取用户信息，放到 cookie 里面
            this.loginInfo = JSON.stringify(response.data.data.userInfo);
            cookie.set("guli_ucenter", this.loginInfo, { domain: "localhost" });
            // 跳转页面
            window.location.href = "/";
          });
        }
      });
    },
    checkPhone(rule, value, callback) {
      //debugger
      if (!/^(\d{5,11}@[qQ][qQ]\.(com|cn|com\.cn))$/.test(value)) {
        return callback(new Error("QQ邮箱格式不正确"));
      }
      return callback();
    },
  },
};
</script>

<style>
.el-form-item__error {
  z-index: 9999999;
}
</style>
