<script>
export default {
    created() {
        // 调用API从本地缓存中获取数据
        const logs = wx.getStorageSync("logs") || [];
        logs.unshift(Date.now());
        wx.setStorageSync("logs", logs);

        console.log("app created and cache logs by setStorageSync");
    }
};
</script>

<style>
page {
    height: 100%;
}
.container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 200rpx 0;
    box-sizing: border-box;
}
/* this rule will be remove */
* {
    transition: width 2s;
    -moz-transition: width 2s;
    -webkit-transition: width 2s;
    -o-transition: width 2s;
}
.bg {
    padding: 5px;
    background: #e2e2e2;
    min-height: 100%;
}
.list {
    width: 100%;
    border-radius: 5px;
    background: #fff;
    color: #778087;
}
.list_li {
    padding: 10px 20px;
    display: flex;
    border-bottom: 1px solid #e2e2e2;
    font-size: 16px;
}
.bage {
    font-size: 12px;
    line-height: 24px;
}
.time_box {
    color: #ccc;
    font-size: 12px;
    line-height: 24px;
}
.bage_box {
    border-radius: 5px;
    background: #f5f5f5;
    padding: 3px 6px;
    color: #999;
}
.num {
    padding-left: 20px;
    display: flex;
    align-items: center;
}
.num_box {
    font-weight: bolder;
    border-radius: 12px;
    height: 12px;
    line-height: 12px;
    padding: 4px;
    font-size: 12px;
    text-align: center;
    width: 30px;
    color: #fff;
    background: #aab0c6;
}
.img {
    width: 35px;
    padding-right: 10px;
}
.img img {
    max-width: 30px;
    max-height: 30px;
}
</style>
