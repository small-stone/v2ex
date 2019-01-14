<template>
    <div class="bg">
        <ul class="list">
            <li v-for="(i,index) in list" :key="index" class="list_li" @click="goto(i.id)">
                <div class="img">
                    <img :src="i.node.avatar_normal">
                </div>
                <div class="title">
                    <div class="bage">
                        <span class="bage_box">{{i.node.title}}</span>
                        · {{i.member.username}}
                    </div>
                    <div class="title_box">{{i.title}}</div>
                    <div class="time_box">{{i.created }}</div>
                </div>
                <div class="num">
                    <div class="num_box">{{i.replies}}</div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import formatTime from "../../utils/index.js";
export default {
    data() {
        return {
            list: []
        };
    },
    filters: {},
    methods: {
        goto(v) {
            wx.navigateTo({
                url: "../detail/main?id=" + v
            });
        },
        async test() {
            wx.showLoading({
                title: "加载中..."
            });
            let that = this;
            wx.request({
                url: "https://www.v2ex.com/api/topics/hot.json",
                success(res) {
                    for (let i of res.data) {
                        i.created = formatTime.formatTime(
                            new Date(i.created * 1000)
                        );
                    }

                    wx.hideLoading();

                    that.list = res.data;
                }
            });
        },
        bindViewTap() {
            const url = "../logs/main";
            wx.navigateTo({ url });
        },
        getUserInfo() {
            // 调用登录接口
            wx.login({
                success: res => {
                    console.log(res);
                    wx.getUserInfo({
                        success: res => {
                            this.userInfo = res.userInfo;
                        }
                    });
                },
                error: e => {
                    console.log(e);
                }
            });
        },
        clickHandle(msg, ev) {
            console.log("clickHandle:", msg, ev);
        }
    },

    created() {
        // 调用应用实例的方法获取全局数据
        // this.getUserInfo();
        this.test();
    }
};
</script>

