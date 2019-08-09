let index = 1
let currentIndex = 1
let flg2 = true
let flg1 = true
let flg0 = true
let flg = true

let flg22 = true
let flg11 = true
let flg00 = true
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idx: 1,
    exhibits: [],
    currentIndex: 0,
    preSubject: {},
    curSubject: {},
    nextSubject: {},
    currentItem: {},

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var that = this
    try {
      var res = wx.getSystemInfoSync()
      console.log(exhibits)
      that.setData({
        height: res.screenHeight,
        width: res.screenWidth,
        preSubject: {},
        curSubject: exhibits[1],
        nextSubject: {},
        itemIndex: 1
      })
      //that.data.curSubject.render = 0

    } catch (e) {
      // Do something when catch error
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */

  getCurrentItem: function (id) {
    let item
    for (let i = 0; i <= maxLen; i++) {
      if (slideList[i].id == id) {
        item = slideList[i]
        break;
      }
    }
    return item
  },
  bchange: function(e) {
    // console.log('bchange')
    //this.data.flg+=1
    console.log(e)
    index = e.detail.current

    if (index == 1) {
      this.data.curSubject.render = 1
      flg1 = true
      flg11 = true

    } else if (index == 2) {
      this.data.nextSubject.render = 1
      flg2 = true
      flg22 = true

    } else {
      this.data.preSubject.render = 1
      flg0 = true
      flg00 = true
    }
    // this.setData({
    //   itemIndex: e.detail.current
    // })
  },
  onShow: function() {
    this.data.flg = 0;
    var that = this
    if (!that.data.playIndex) { // 没有播放时播放视频 
      that.setData({
        playIndex: "video1",
      })
      //console.log(this.data.playIndex)
      // 默认播放第一个视频
      var videoContext = wx.createVideoContext("video1")
      videoContext.play()
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },


  //触摸开始事件
  touchstart: function(e) {
  
    this.data.touchstartY = e.touches[0].clientY

  },
  //触摸移动事件
  touchmove: function(e) {
    //  console.log(e)
    let touchendY = e.touches[0].clientY //
    let touchstartY = this.data.touchstartY
    let touchMove = e.touches[0].pageX;
 
      //向上
    if (touchendY - touchstartY < 0) {
    
   
      if (e.currentTarget.id == 'pre') {
        if (flg00 && (this.data.curSubject.render == undefined || this.data.curSubject.render == 1)) {
          if (currentIndex == maxLen) {
            currentIndex = -1
          }
          flg00 = false
          currentIndex += 1

          this.setData({
            curSubject: exhibits[currentIndex]
          })
          this.data.curSubject.render = 0

        }
      } else if (e.currentTarget.id == 'cur') {
        if (flg11 && (this.data.nextSubject.render == undefined || this.data.nextSubject.render == 1)) {
          if (currentIndex == maxLen) {
            currentIndex = -1
          }
          flg11 = false
          currentIndex += 1

          this.setData({
            nextSubject: exhibits[currentIndex]
          })
          this.data.nextSubject.render = 0

        }
      } else {
        if (flg22 && (this.data.preSubject.render == undefined || this.data.preSubject.render == 1)) {
          if (currentIndex == maxLen) {
            currentIndex = -1
          }
          flg22 = false
          currentIndex += 1

          this.setData({
            preSubject: exhibits[currentIndex]
          })
          this.data.preSubject.render = 0

        }
      }

    } else {
        //向下
        if (e.currentTarget.id == 'pre') {
          if (flg0 && (this.data.nextSubject.render == undefined || this.data.nextSubject.render == 1)) {
            if (currentIndex == 0) {
              currentIndex = maxLen + 1
            }
            flg0 = false
            currentIndex -= 1

            this.setData({
              nextSubject: exhibits[currentIndex]
            })
            this.data.nextSubject.render = 0

          }
        } else if (e.currentTarget.id == 'cur') {
          if (flg1 && (this.data.preSubject.render == undefined || this.data.preSubject.render == 1)) {
            if (currentIndex == 0) {
              currentIndex = maxLen + 1
            }
            flg1 = false
            currentIndex -= 1

            this.setData({
              preSubject: exhibits[currentIndex]
            })
            this.data.preSubject.render = 0

          }
        } else {
          if (flg2 && (this.data.curSubject.render == undefined || this.data.curSubject.render == 1)) {
            if (currentIndex == 0) {
              currentIndex = maxLen + 1
            }
            flg2 = false
            currentIndex -= 1

            this.setData({
              curSubject: exhibits[currentIndex]
            })
            this.data.curSubject.render = 0

          }
        }

      }

  },
  //触摸结束事件
  touchend: function(e) {
 
  },


})



const res = { "result": 1, "msg": "成功", "data": { "museum": { "id": 776, "museumName": "安徽晋煤中能化工有限公司", "coverImage": "1564492103678.jpg", "introduction": "中能化工是集化肥、化工、热电联产、设备加工安装、压力容器制造于一体的综合性煤化工企业，为中国氮肥五十强、中国化工五百强、中国工业行业履行社会责任五星级企业。\n\n中能化工始建于1970年，前身为临泉化肥厂，1994年进行股份制改造，2003年改制为民营企业，2010年3月因发展需要更名为“安徽晋煤中能化工股份有限公司”，下辖三个子公司：安徽泉盛化工有限公司、阜阳安固公司锅炉压力容器制造有限公司、新疆中能万源化工有限公司。", "clickCount": 1984, "likeCount": 1, "collectCount": 6, "type": 1, "template": 1, "music": "https://www.cni-expo.com/store/uploads/1564734629411.mp3", "video": "https://www.cni-expo.com/store/uploads/1564533931242.mp4", "phone": "13695581575", "email": "64969874@qq.com", "address": "安徽省阜阳市临泉县临化路2号", "createTime": 1564127703000, "setMeal": { "id": 3, "name": "标准版", "type": 1, "imageNum": 500, "voiceNum": 500, "videoNum": 50, "videoMemory": 500, "topNum": 200, "template": 4, "sort": 0, "price": 5000, "threeModel": null, "rankRecommend": "一周", "logoUse": "1月", "excellentRecommend": "7天", "popularRecommend": "7天", "bannerUse": "无", "activityRelease": "15天", "isExperience": 0, "isDel": 0 }, "exhibits": [{ "id": 7985, "rank": 0, "exhibitsName": "厂区里的高塔冲出云霄", "coverImage": "https://www.cni-expo.com/store/uploads/1564730084225.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "临泉总部", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 3, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 7986, "rank": 0, "exhibitsName": "期待这个在建的第三期航天炉", "coverImage": "https://www.cni-expo.com/store/uploads/1564730079927.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "临泉总部", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 3, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 7987, "rank": 0, "exhibitsName": "绿树见证临泉中能的历史", "coverImage": "https://www.cni-expo.com/store/uploads/1564730075488.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "临泉总部", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 6, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 7988, "rank": 0, "exhibitsName": "全时监控，守住分秒安全", "coverImage": "https://www.cni-expo.com/store/uploads/1564730071985.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "临泉总部", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 2, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 7989, "rank": 0, "exhibitsName": "这里我支持你们各种工作", "coverImage": "https://www.cni-expo.com/store/uploads/1564730067926.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "临泉总部", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 1, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 7990, "rank": 0, "exhibitsName": "这里是我们中能的标志", "coverImage": "https://www.cni-expo.com/store/uploads/1564730060559.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "临泉总部", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 1, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 7991, "rank": 0, "exhibitsName": "凉水塔冒的不是烟，而是水蒸气", "coverImage": "https://www.cni-expo.com/store/uploads/1564730056684.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "临泉总部", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 1, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 7992, "rank": 0, "exhibitsName": "三座高塔，中能脊梁", "coverImage": "https://www.cni-expo.com/store/uploads/1564730020403.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "新疆万源", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 5, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 7993, "rank": 0, "exhibitsName": "热电联产，不浪费每一分燃料", "coverImage": "https://www.cni-expo.com/store/uploads/1564730015828.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "新疆万源", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 4, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 7994, "rank": 0, "exhibitsName": "每一个根管道都有它的方向", "coverImage": "https://www.cni-expo.com/store/uploads/1564730012389.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "新疆万源", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 6, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 7995, "rank": 0, "exhibitsName": "女儿说，爸爸厂里有摩天大楼", "coverImage": "https://www.cni-expo.com/store/uploads/1564730008575.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "新疆万源", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 1, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 7996, "rank": 0, "exhibitsName": "从氮肥到煤化工，中能走过半个世纪", "coverImage": "https://www.cni-expo.com/store/uploads/1564729999948.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "新疆万源", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 1, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 7997, "rank": 0, "exhibitsName": "从建厂那天起，用好每一滴水", "coverImage": "https://www.cni-expo.com/store/uploads/1564729993637.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "新疆万源", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 1, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 7998, "rank": 0, "exhibitsName": "试车运行753小时，比预想更好", "coverImage": "https://www.cni-expo.com/store/uploads/1564729990229.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "新疆万源", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 0, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 7999, "rank": 0, "exhibitsName": "15个工位，联控全厂1375个设备", "coverImage": "https://www.cni-expo.com/store/uploads/1564729986804.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "新疆万源", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 2, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8000, "rank": 0, "exhibitsName": "女儿说，这儿很漂亮", "coverImage": "https://www.cni-expo.com/store/uploads/1564729982196.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "新疆万源", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 1, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8001, "rank": 0, "exhibitsName": "这里年产15万吨双氧水", "coverImage": "https://www.cni-expo.com/store/uploads/1565076314821.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "泉盛化工", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 1, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8002, "rank": 0, "exhibitsName": "双氧水合成塔，是这里最明显的标志", "coverImage": "https://www.cni-expo.com/store/uploads/1564729971430.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "泉盛化工", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 3, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8003, "rank": 0, "exhibitsName": "花了心血建了泉盛化工的氨合成塔", "coverImage": "https://www.cni-expo.com/store/uploads/1564729967239.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "泉盛化工", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 1, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8004, "rank": 0, "exhibitsName": "全厂区都严谨执行“安全第一”", "coverImage": "https://www.cni-expo.com/store/uploads/1565076366543.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "泉盛化工", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 0, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8005, "rank": 0, "exhibitsName": "安全又牢固，锅炉用安固", "coverImage": "https://www.cni-expo.com/store/uploads/1564729943263.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "安固厂区", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 0, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8006, "rank": 0, "exhibitsName": "超大型锅炉容器", "coverImage": "https://www.cni-expo.com/store/uploads/1564729935868.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "安固厂区", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 0, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8007, "rank": 0, "exhibitsName": "小型高效能锅炉容器", "coverImage": "https://www.cni-expo.com/store/uploads/1564729939780.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "安固厂区", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 1, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8008, "rank": 0, "exhibitsName": "压力监测设备", "coverImage": "https://www.cni-expo.com/store/uploads/1564729919849.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "安固厂区", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 1, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8009, "rank": 0, "exhibitsName": "精修每一寸，确保安固", "coverImage": "https://www.cni-expo.com/store/uploads/1564729913044.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "安固厂区", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 0, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8010, "rank": 0, "exhibitsName": "记得早年中能化工建成落地，我们十分兴奋", "coverImage": "https://www.cni-expo.com/store/uploads/1565076424579.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "中能历史", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 0, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8011, "rank": 0, "exhibitsName": "这里的一砖一瓦都有我们每个人的心血", "coverImage": "https://www.cni-expo.com/store/uploads/1565076429703.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "中能历史", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 1, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8012, "rank": 0, "exhibitsName": "我们中能跨越了五十个春秋", "coverImage": "https://www.cni-expo.com/store/uploads/1565075469078.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "中能历史", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 1, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8013, "rank": 0, "exhibitsName": "航天炉让一线员工觉得特别牛", "coverImage": "", "exhibitsVideo": "https://www.cni-expo.com/store/uploads/1565327098495.mp4", "exhibitsMusic": "", "sortName": "航天炉", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 2, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8014, "rank": 0, "exhibitsName": "航天第一次吊装成功，辛苦了半年，泪目了", "coverImage": "https://www.cni-expo.com/store/uploads/1565075440075.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "航天炉", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 1, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8015, "rank": 0, "exhibitsName": "航天高科技，一样可以用在煤化工", "coverImage": "https://www.cni-expo.com/store/uploads/1564729871957.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "航天炉", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 0, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8016, "rank": 0, "exhibitsName": "平地筑起了全国第一座航天炉", "coverImage": "https://www.cni-expo.com/store/uploads/1564729867656.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "航天炉", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 1, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8017, "rank": 0, "exhibitsName": "考察航天炉试运行，专家连连称赞", "coverImage": "https://www.cni-expo.com/store/uploads/1564729862685.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "航天炉", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 1, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8018, "rank": 0, "exhibitsName": "泉河牌化肥，好得有理有据", "coverImage": "https://www.cni-expo.com/store/uploads/1564729850648.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "化工产品", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 2, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8019, "rank": 0, "exhibitsName": "我们的化肥造福农业生产", "coverImage": "https://www.cni-expo.com/store/uploads/1564729846794.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "化工产品", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 2, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8020, "rank": 0, "exhibitsName": "污水不流外人田", "coverImage": "https://www.cni-expo.com/store/uploads/1564729834157.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "绿色环保", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 1, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8021, "rank": 0, "exhibitsName": "绿水青山就是金山银山", "coverImage": "https://www.cni-expo.com/store/uploads/1564729829174.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "绿色环保", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 1, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8022, "rank": 0, "exhibitsName": "污水到这里将被净化", "coverImage": "https://www.cni-expo.com/store/uploads/1564729824371.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "绿色环保", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 1, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8023, "rank": 0, "exhibitsName": "节能技术改造项目，有我的一份力量", "coverImage": "https://www.cni-expo.com/store/uploads/1564729815395.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "绿色环保", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 2, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8024, "rank": 0, "exhibitsName": "将节能减排进行到底", "coverImage": "https://www.cni-expo.com/store/uploads/1564729804544.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "绿色环保", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 1, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8025, "rank": 0, "exhibitsName": "这道防风网挡住了煤灰，保卫了空气的洁净", "coverImage": "https://www.cni-expo.com/store/uploads/1565076020817.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "绿色环保", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 1, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8026, "rank": 0, "exhibitsName": "锅炉节能改造，为环保多尽一份社会责任", "coverImage": "https://www.cni-expo.com/store/uploads/1565076024527.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "绿色环保", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 1, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8027, "rank": 0, "exhibitsName": "每一处环保监控都可为化工正名", "coverImage": "https://www.cni-expo.com/store/uploads/1565076027706.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "绿色环保", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 2, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8028, "rank": 0, "exhibitsName": "在这里，看见花儿中能", "coverImage": "https://www.cni-expo.com/store/uploads/1564729782927.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "花儿中能", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 2, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8029, "rank": 0, "exhibitsName": "绿植捍卫每一座建筑", "coverImage": "https://www.cni-expo.com/store/uploads/1564729778411.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "花儿中能", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 1, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8030, "rank": 0, "exhibitsName": "阳光照亮这篇绿色的土地", "coverImage": "https://www.cni-expo.com/store/uploads/1564729776034.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "花儿中能", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 1, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8031, "rank": 0, "exhibitsName": "孩子告诉我，他最爱花儿中能", "coverImage": "https://www.cni-expo.com/store/uploads/1565075807876.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "花儿中能", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 2, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8032, "rank": 0, "exhibitsName": "粉煤加压连续运行407天，打破世界纪录", "coverImage": "", "exhibitsVideo": "https://www.cni-expo.com/store/uploads/1565327113642.mp4", "exhibitsMusic": "", "sortName": "徐总经理", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 2, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8033, "rank": 0, "exhibitsName": "坚定在新疆投资创业的决心", "coverImage": "", "exhibitsVideo": "https://www.cni-expo.com/store/uploads/1565327120898.mp4", "exhibitsMusic": "", "sortName": "徐总经理", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 2, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8034, "rank": 0, "exhibitsName": "将新疆中能打造成“花儿中能”", "coverImage": "", "exhibitsVideo": "https://www.cni-expo.com/store/uploads/1565327127635.mp4", "exhibitsMusic": "", "sortName": "徐总经理", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 3, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8035, "rank": 0, "exhibitsName": "2周学会了十八般安全技能", "coverImage": "https://www.cni-expo.com/store/uploads/1565079618717.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "安全生产", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 2, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8036, "rank": 0, "exhibitsName": "再辛苦也要过好安全关", "coverImage": "https://www.cni-expo.com/store/uploads/1564729736878.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "安全生产", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 1, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8037, "rank": 0, "exhibitsName": "将安全意识深入人心", "coverImage": "https://www.cni-expo.com/store/uploads/1564729732804.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "安全生产", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 1, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8038, "rank": 0, "exhibitsName": "人人动起来，做好应急预案演练", "coverImage": "https://www.cni-expo.com/store/uploads/1564729728825.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "安全生产", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 1, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8039, "rank": 0, "exhibitsName": "应急安全演练，遇到危机再也不慌了", "coverImage": "https://www.cni-expo.com/store/uploads/1564729720089.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "安全生产", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 1, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8040, "rank": 0, "exhibitsName": "年年学习，都要通过安全考试", "coverImage": "https://www.cni-expo.com/store/uploads/1564729713236.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "安全生产", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 3, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8041, "rank": 0, "exhibitsName": "安全演练，大家做好会前推演", "coverImage": "https://www.cni-expo.com/store/uploads/1564729709056.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "安全生产", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 2, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8042, "rank": 0, "exhibitsName": "企业的长远发展依靠的是团队，而不是个人", "coverImage": "https://www.cni-expo.com/store/uploads/1564729702648.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "中能人物", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 2, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8043, "rank": 0, "exhibitsName": "写下应做的，按写下的做，记录好做过的", "coverImage": "https://www.cni-expo.com/store/uploads/1564729698776.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "中能人物", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 1, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8044, "rank": 0, "exhibitsName": "打造一支优秀的干部员工队伍", "coverImage": "https://www.cni-expo.com/store/uploads/1564729694016.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "中能人物", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 1, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8045, "rank": 0, "exhibitsName": "化工是人类美好生活的基础", "coverImage": "https://www.cni-expo.com/store/uploads/1564729686905.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "中能人物", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 1, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8046, "rank": 0, "exhibitsName": "张董事长春节慰问新疆一线员工", "coverImage": "https://www.cni-expo.com/store/uploads/1565075349965.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "员工活动", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 1, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8047, "rank": 0, "exhibitsName": "多彩员工生活", "coverImage": "https://www.cni-expo.com/store/uploads/1564729676540.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "员工活动", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 1, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8048, "rank": 0, "exhibitsName": "做公益，送温暖", "coverImage": "https://www.cni-expo.com/store/uploads/1564729672765.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "员工活动", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 1, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8049, "rank": 0, "exhibitsName": "植树跑步爱运动，年轻健康中能人", "coverImage": "https://www.cni-expo.com/store/uploads/1564729668588.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "员工活动", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 1, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8050, "rank": 0, "exhibitsName": "“小陈又加班了？再添个鸡腿！”饭堂阿姨说", "coverImage": "https://www.cni-expo.com/store/uploads/1564729658733.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "员工生活", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 1, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8051, "rank": 0, "exhibitsName": "食堂美食，真香", "coverImage": "https://www.cni-expo.com/store/uploads/1564729652925.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "员工生活", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 0, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8052, "rank": 0, "exhibitsName": "师傅把菜满上说，年轻人长身体啊", "coverImage": "https://www.cni-expo.com/store/uploads/1564729639480.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "员工生活", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 1, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8053, "rank": 0, "exhibitsName": "老公来了，新疆就有家了", "coverImage": "https://www.cni-expo.com/store/uploads/1564729629870.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "员工生活", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 1, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8054, "rank": 0, "exhibitsName": "最爱饭堂的大盘鸡拉面", "coverImage": "https://www.cni-expo.com/store/uploads/1564729616887.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "员工生活", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 0, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8055, "rank": 0, "exhibitsName": "夕阳无限好，疆域多晚霞", "coverImage": "https://www.cni-expo.com/store/uploads/1564729610226.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "员工生活", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 0, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8056, "rank": 0, "exhibitsName": "夜游新疆国际大巴扎，边疆的繁华", "coverImage": "https://www.cni-expo.com/store/uploads/1564729596569.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "新疆景色", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 0, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8057, "rank": 0, "exhibitsName": "新疆的周末，蓝天白云金沙漠", "coverImage": "https://www.cni-expo.com/store/uploads/1564729591324.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "新疆景色", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 0, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8058, "rank": 0, "exhibitsName": "暴雪中拍照，发朋友圈“瑞雪兆丰年”", "coverImage": "https://www.cni-expo.com/store/uploads/1564729578829.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "新疆生活", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 0, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8059, "rank": 0, "exhibitsName": "走在民街，与每一个维民微笑问好", "coverImage": "https://www.cni-expo.com/store/uploads/1564729560096.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "新疆景色", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 0, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8060, "rank": 0, "exhibitsName": "新疆夜里灯火阑珊，真美", "coverImage": "https://www.cni-expo.com/store/uploads/1564729508717.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "新疆生活", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 0, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8061, "rank": 0, "exhibitsName": "新疆不止葡萄干，还有七彩生活", "coverImage": "https://www.cni-expo.com/store/uploads/1564729502101.jpg", "exhibitsVideo": "", "exhibitsMusic": "", "sortName": "新疆生活", "exhibitsIntroduce": "", "isDel": 0, "collectCount": 0, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8062, "rank": 0, "exhibitsName": "新型化工，疆域中能", "coverImage": "", "exhibitsVideo": "https://www.cni-expo.com/store/uploads/1565327225552.mp4", "exhibitsMusic": "", "sortName": "厂区航拍", "exhibitsIntroduce": "新疆厂区一览", "isDel": 0, "collectCount": 0, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8063, "rank": 0, "exhibitsName": "阳光温暖大地，化工美好生活", "coverImage": "", "exhibitsVideo": "https://www.cni-expo.com/store/uploads/1565327233464.mp4", "exhibitsMusic": "", "sortName": "厂区航拍", "exhibitsIntroduce": "新疆日出航拍厂区", "isDel": 0, "collectCount": 0, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8064, "rank": 0, "exhibitsName": "这片土地，3000吨长成300万吨", "coverImage": "", "exhibitsVideo": "https://www.cni-expo.com/store/uploads/1565327241597.mp4", "exhibitsMusic": "", "sortName": "厂区航拍", "exhibitsIntroduce": "临泉航拍全貌", "isDel": 0, "collectCount": -1, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8065, "rank": 0, "exhibitsName": "安全运行10万小时，日产双氧水300吨", "coverImage": "", "exhibitsVideo": "https://www.cni-expo.com/store/uploads/1565327256770.mp4", "exhibitsMusic": "", "sortName": "厂区航拍", "exhibitsIntroduce": "泉盛化工双氧水塔全貌", "isDel": 0, "collectCount": 0, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8066, "rank": 0, "exhibitsName": "骨干员工持股，成为资产所有者", "coverImage": "", "exhibitsVideo": "https://www.cni-expo.com/store/uploads/1565327306627.mp4", "exhibitsMusic": "", "sortName": "张董事长", "exhibitsIntroduce": "张董事长讲话", "isDel": 0, "collectCount": 2, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8067, "rank": 0, "exhibitsName": "煤化工，有信心有前景", "coverImage": "", "exhibitsVideo": "https://www.cni-expo.com/store/uploads/1565327300652.mp4", "exhibitsMusic": "", "sortName": "张董事长", "exhibitsIntroduce": "张董事长讲话", "isDel": 0, "collectCount": 1, "orgnName": null, "museumId": 0, "status": 0, "isCollect": 0 }, { "id": 8068, "rank": 0, "exhibitsName": "热爱化工，过幸福生活", "coverImage": "", "exhibitsVideo": "https://www.cni-expo.com/store/uploads/1565327288322.mp4", "exhibitsMusic": "", "sortName": "张董事长", "exhibitsIntroduce": "张董事长讲话", "isDel": 0, "collectCount": -4, "orgnName": null, "museumId": 0, "status": 1, "isCollect": 0 }], "imgCount": 0, "videoCount": 0, "musicCount": 0, "museumType": 0, "expiryTime": 1564416000000, "editStatus": false, "isDel": 0, "publishCount": 18, "status": 2, "auditRemarks": null, "applyAuditTime": 1564127844000, "auditPassTime": 1564546646000, "publishStatus": 2, "publishAuditRemarks": null, "publishApplyAuditTime": 1565327458000, "publishAuditPassTime": null, "link3D": null, "publish3DStatus": 1, "publishAudit3DRemarks": null, "publishApplyAudit3DTime": 1564486011000, "publishAuditPass3DTime": null, "threeDUrl": null, "setMealId": 0, "museumItem": null, "orgnMuseum": null, "industryMuseum": null, "regionMuseum": null, "countryMuseum": null, "themeMuseum": null, "customRecom": null, "customRecomName": null, "yestDayNum": 0, "thirtyDayNum": 0, "sumNum": 0, "yestDayTime": 0.0, "thirtyDayTime": 0.0, "sumTime": 0.0, "logo": null, "slogan": null, "orgnName": null, "province": null, "city": null, "industryStory": null, "likeStatus": 1, "isCollect": 0, "collectStatus": 1 }, "orgnLogo": "https://www.cni-expo.com/store/uploads/1565328455092.jpg" } }

const exhibits = res.data.museum.exhibits
const maxLen = exhibits.length - 1