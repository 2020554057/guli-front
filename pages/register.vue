<template>
  <div class="main">
    <div class="title">
      <a href="/login">登录</a>
      <span>·</span>
      <a class="active" href="/register">注册</a>
    </div>

    <div class="sign-up-container">
      <el-form ref="userForm" :model="params">
        <el-form-item
          class="input-prepend restyle"
          prop="nickname"
          :rules="[
            { required: true, message: '请输入你的昵称', trigger: 'blur' },
          ]"
        >
          <div>
            <el-input
              type="text"
              placeholder="你的昵称"
              v-model="params.nickname"
            />
            <i class="iconfont icon-user" />
          </div>
        </el-form-item>

        <el-form-item
          class="input-prepend restyle no-radius"
          prop="mobile"
          :rules="[
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { validator: checkPhone, trigger: 'blur' },
          ]"
        >
          <div>
            <el-input
              type="text"
              placeholder="手机号"
              v-model="params.mobile"
            />
            <i class="iconfont icon-phone" />
          </div>
        </el-form-item>

        <el-form-item
          class="input-prepend restyle no-radius"
          prop="code"
          :rules="[
            { required: true, message: '请输入验证码', trigger: 'blur' },
          ]"
        >
          <div
            style="width: 100%; display: block; float: left; position: relative"
          >
            <el-input type="text" placeholder="验证码" v-model="params.code" />
            <i class="iconfont icon-phone" />
          </div>
          <div
            class="btn"
            style="position: absolute; right: 0; top: 6px; width: 40%"
          >
            <a
              href="javascript:"
              type="button"
              @click="getCodeFun()"
              :value="codeTest"
              style="border: none; background-color: none"
              >{{ codeTest }}</a
            >
          </div>
        </el-form-item>

        <el-form-item
          class="input-prepend"
          prop="password"
          :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]"
        >
          <div>
            <el-input
              type="password"
              placeholder="设置密码"
              v-model="params.password"
            />
            <i class="iconfont icon-password" />
          </div>
        </el-form-item>

        <div class="btn">
          <input
            type="button"
            class="sign-up-button"
            value="注册"
            @click="submitRegister()"
          />
        </div>
        <p class="sign-up-msg">
          点击 “注册” 即表示您同意并愿意遵守简书
          <br />
          <a target="_blank" href="http://www.jianshu.com/p/c44d171298ce"
            >用户协议</a
          >
          和
          <a target="_blank" href="http://www.jianshu.com/p/2ov8x3">隐私政策</a>
          。
        </p>
      </el-form>
      <!-- 更多注册方式 -->
      <div class="more-sign">
        <h6>社交帐号直接注册</h6>
        <ul>
          <li>
            <a
              id="weixin"
              class="weixin"
              target="_blank"
              href="http://huaan.free.idcfengye.com/api/ucenter/wx/login"
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

import registerApi from "@/api/register";

export default {
  layout: "sign",
  data() {
    return {
      params: {
        //封装注册输入数据
        mobile: "",
        code: "", //验证码
        nickname: "",
        password: "",
      },
      sending: true, //是否发送验证码
      second: 60, //倒计时间
      codeTest: "获取验证码",
    };
  },
  methods: {
    //注册提交的方法
    submitRegister() {
      registerApi.registerMember(this.params).then((response) => {
        if (response.data.code === 20000) {
          //提示注册成功
          this.$message({
            type: "success",
            message: "注册成功",
          });
          //跳转登录页面
          this.$router.push({ path: "/login" });
        } else {
          //提示注册失败信息
          this.$message({
            type: "error",
            message: response.data.message,
          });
        }
      });
    },
    //倒计时
    timeDown() {
      let result = setInterval(() => {
        --this.second;
        this.codeTest = this.second;
        if (this.second < 1) {
          clearInterval(result);
          this.sending = true;
          //this.disabled = false;
          this.second = 60;
          this.codeTest = "获取验证码";
        }
      }, 1000);
    },
    //通过输入手机号发送验证码
    getCodeFun() {
      registerApi.sendCode(this.params.mobile).then((response) => {
        this.sending = false;
        //调用倒计时的方法
        this.timeDown();
      });
    },
    //手机号正则：!(/^1[34578]\d{9}$/.test(value))
    //目前使用的是邮箱验证
    //邮箱的正则：[1-9]\d{7,10}@qq\.com
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