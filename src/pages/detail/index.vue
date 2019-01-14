<template>
    <div class="bg">
        <div class="topic">
            <div class="toptit">
                {{topic.title}}
                <div
                    class="title_time"
                    v-if="topic.member"
                >by {{topic.member.username}} at {{topic.created}}</div>
            </div>
            <div class="top_item">{{topic.content}}</div>
        </div>
        <ul class="list" v-if="list.length">
            <li v-for="(i,index) in list" :key="index" class="list_li">
                <div class="img">
                    <img :src="i.member.avatar_normal">
                </div>
                <div class="title">
                    <div class="rep_name">
                        <span class="rep_bage">{{i.member.username}}</span>
                        ·{{i.created}}
                    </div>
                    <div class="rep_item">{{i.content}}</div>
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
            list: [],
            topic: []
        };
    },
    filters: {},
    methods: {
        getTopicInfo() {
            wx.showLoading({
                title: "加载中..."
            });

            let that = this;
            wx.request({
                url: "https://www.v2ex.com/api/topics/show.json",
                data: {
                    id: that.$root.$mp.query.id
                },
                success(res) {
                    res.data[0].created = formatTime.formatTime(
                        new Date(res.data[0].created * 1000)
                    );
                    that.topic = res.data[0];
                    that.getData();
                }
            });
        },
        getData() {
            let that = this;
            wx.request({
                url: "https://www.v2ex.com/api/replies/show.json",
                data: {
                    topic_id: that.$root.$mp.query.id
                },
                success(res) {
                    for (let i of res.data) {
                        i.created = formatTime.formatTime(
                            new Date(i.created * 1000)
                        );
                    }
                    console.log(res.data);

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
    onLoad() {
        this.getTopicInfo();
    },

    created() {
        // 调用应用实例的方法获取全局数据
    }
};
</script>

<style>
.rep_item {
    word-break: break-all;
}
.title_time {
    color: #999;
    margin-top: 5px;
    font-size: 12px;
}
.toptit {
    border-bottom: 1px solid #ccc;
}
.rep_bage {
    padding: 2px 5px;
    background: #f5f5f5;
    color: #999;
    border-radius: 5px;
}
.rep_name {
    font-size: 12px;
    padding-bottom: 5px;
}
.topic {
    border-radius: 5px;

    background: #fff;
    margin-bottom: 5px;
    font-size: 22px;
    border-bottom: 1px solid #ccc;
}
.topic > div {
    padding: 10px;
    box-sizing: border-box;
}
.top_item {
    line-height: 20px;
    padding: 10px 20px;
    font-size: 16px;
    width: 100%;
}
</style>

