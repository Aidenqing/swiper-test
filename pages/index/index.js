let index = 0
let currentIndex = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idx: 1,
    exhibits: [],
    currentIndex: 1,
    preSubject: {},
    curSubject: {},
    nextSubject: {},

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
        curSubject: exhibits[0],
        nextSubject: exhibits[1]
      })
      //that.data.curSubject.render = 0

    } catch (e) {
      // Do something when catch error
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  afinish: function(e) {
    // console.log('afinish')

  },
  bchange: function(e) {
    // console.log('bchange')
    //this.data.flg+=1
    // console.log(e)
    index = e.detail.current

    if (index == 0) {
      this.data.curSubject.render = 1
    } else {
      this.data.nextSubject.render = 1
    }
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
    //console.log(e.touches[0].clientY)
    //console.log(e.touches[0].pageX);
    this.data.touchDot = e.touches[0].pageX;
    this.data.touchstartY = e.touches[0].clientY
    var that = this;
    this.data.interval = setInterval(function() {
      that.data.time += 1;
    }, 100);
  },
  //触摸移动事件
  touchmove: function(e) {
    //console.log(e)
    let touchendY = e.touches[0].clientY //
    let touchstartY = this.data.touchstartY
    let touchMove = e.touches[0].pageX;
    let touchDot = this.data.touchDot;
    let time = this.data.time;
    // console.log('差值=' + (touchendY - touchstartY))
    // console.log('time=' + this.data.time)
    // console.log('done+' + this.data.done)
    // console.log("touchMove: " + touchMove + ", touchDot: " + touchDot + ", diff: " + (touchMove - touchDot));
    //向s
    if (touchendY - touchstartY < 0) {

      if (index == maxLen && currentIndex == maxLen) {
        this.setData({
          nextSubject: exhibits[0]
        })
      } else {
        if (currentIndex == maxLen) {
          currentIndex = 0
        }
        if (e.currentTarget.id == 'cur') {

          if (this.data.nextSubject.render == undefined || this.data.nextSubject.render == 1) {
            currentIndex += 1
            console.log(" cur curindex===" + currentIndex)

            this.setData({
              nextSubject: exhibits[currentIndex]
            })
            this.data.nextSubject.render = 0

          }
        } else {
          if (this.data.curSubject.render == undefined || this.data.curSubject.render == 1) {
            currentIndex += 1

            console.log(" next curindex===" + currentIndex)
            this.setData({
              curSubject: exhibits[currentIndex]
            })
            this.data.curSubject.render = 0

          }
        }

      }


    } else {
      //向x
      // console.log(index == 0 && currentIndex == 0)
     // console.log('index=='+index,'curren=='+currentIndex)
      if (index == 0 && currentIndex == 0) {
        this.setData({
          nextSubject: exhibits[maxLen]
        })
        this.data.nextSubject.render = 0

      } else {
        if (currentIndex == 0) {
          currentIndex = maxLen
        }
        if (e.currentTarget.id == 'cur') {

          if (this.data.nextSubject.render == undefined || this.data.nextSubject.render == 1) {
            currentIndex -= 1
            console.log(" cur curindex===" + currentIndex +'index='+index)

            this.setData({
              nextSubject: exhibits[currentIndex]
            })
            this.data.nextSubject.render = 0

          }
        } else {
          if (this.data.curSubject.render == undefined || this.data.curSubject.render == 1) {
            currentIndex -= 1

            console.log(" next curindex===" + currentIndex+'index=' + index)
            this.setData({
              curSubject: exhibits[currentIndex]
            })
            this.data.curSubject.render = 0

          }
        }

      }


    }
    if (true) {
      return
    }
    //向左滑动

    if (touchMove - touchDot <= -40 && time < 10 && !this.data.done) {
      console.log("向左滑动");
      this.data.done = true;
      // this.scrollLeft();
    }
    //向右滑动
    if (touchMove - touchDot >= 40 && time < 10 && !this.data.done) {
      console.log("向右滑动");
      this.data.done = true;
      // this.scrollRight();
    }
    //向上滑动
    if (touchendY - touchstartY <= -40 && time < 10 && !this.data.done) {
      console.log("向上滑动");
      this.data.done = true;
      //this.scrollTop();
    }
    //向下滑动
    if (touchendY - touchstartY >= 40 && time < 10 && !this.data.done) {
      console.log("向下滑动");
      this.data.done = true;
      //this.scrollBottom();
    }


  },
  //触摸结束事件
  touchend: function(e) {
    clearInterval(this.data.interval);
    this.data.time = 0;
    this.data.done = false;
  },
  scrollLeft() {
    var animation1 = wx.createAnimation({
      duration: 300,
      timingFunction: "linear",
      delay: 0
    })
    var animation2 = wx.createAnimation({
      duration: 300,
      timingFunction: "linear",
      delay: 0
    })
    var animation3 = wx.createAnimation({
      duration: 300,
      timingFunction: "linear",
      delay: 0
    })
    var animation4 = wx.createAnimation({
      duration: 300,
      timingFunction: "linear",
      delay: 0
    })
    var animation5 = wx.createAnimation({
      duration: 300,
      timingFunction: "linear",
      delay: 0
    })

    this.animation1 = animation1;
    this.animation2 = animation2;
    this.animation3 = animation3;
    this.animation4 = animation4;
    this.animation5 = animation5;

    this.animation1.translateX(-60).opacity(0).step();
    this.animation2.translateX(-140).opacity(0.5).scale(0.8, 0.8).step();
    this.animation3.translateX(-110).opacity(0.5).scale(1, 1).step();
    this.animation4.translateX(-70).opacity(1).scale(1.4, 1.4).step();
    this.animation5.translateX(-30).opacity(0.5).scale(1, 1).step();


    this.setData({
      animation1: animation1.export(),
      animation2: animation2.export(),
      animation3: animation3.export(),
      animation4: animation4.export(),
      animation5: animation5.export()
    })

    var that = this;
    setTimeout(function() {
      that.animation1.translateX(-50).opacity(0.2).scale(0.8, 0.8).step({
        duration: 0,
        timingFunction: 'linear'
      });
      that.animation2.translateX(-40).opacity(0.5).scale(1, 1).step({
        duration: 0,
        timingFunction: 'linear'
      });
      that.animation3.translateX(0).opacity(1).scale(1.4, 1.4).step({
        duration: 0,
        timingFunction: 'linear'
      });
      that.animation4.translateX(40).opacity(0.5).scale(1, 1).step({
        duration: 0,
        timingFunction: 'linear'
      });
      that.animation5.translateX(50).opacity(0.2).scale(0.8, 0.8).step({
        duration: 0,
        timingFunction: 'linear'
      });
      that.setData({
        animation1: animation1.export(),
        animation2: animation2.export(),
        animation3: animation3.export(),
        animation4: animation4.export(),
        animation5: animation5.export()
      })
    }.bind(this), 195)

    let array = this.data.clubs;
    let shift = array.shift();
    array.push(shift);

    setTimeout(function() {
      this.setData({
        clubs: array
      })
    }.bind(this), 195)
  },

  //向右滑动事件
  scrollRight() {
    var animation1 = wx.createAnimation({
      duration: 300,
      timingFunction: "linear",
      delay: 0
    })
    var animation2 = wx.createAnimation({
      duration: 300,
      timingFunction: "linear",
      delay: 0
    })
    var animation3 = wx.createAnimation({
      duration: 300,
      timingFunction: "linear",
      delay: 0
    })
    var animation4 = wx.createAnimation({
      duration: 300,
      timingFunction: "linear",
      delay: 0
    })
    var animation5 = wx.createAnimation({
      duration: 300,
      timingFunction: "linear",
      delay: 0
    })

    this.animation1 = animation1;
    this.animation2 = animation2;
    this.animation3 = animation3;
    this.animation4 = animation4;
    this.animation5 = animation5;

    this.animation1.translateX(30).opacity(0.5).scale(1, 1).step();
    this.animation2.translateX(70).opacity(1).scale(1.4, 1.4).step();
    this.animation3.translateX(110).opacity(0.5).scale(1, 1).step();
    this.animation4.translateX(120).opacity(0.2).scale(0.8, 0.8).step();
    this.animation5.translateX(130).opacity(0).step();


    this.setData({
      animation1: animation1.export(),
      animation2: animation2.export(),
      animation3: animation3.export(),
      animation4: animation4.export(),
      animation5: animation5.export()
    })

    var that = this;
    setTimeout(function() {
      that.animation1.translateX(-50).opacity(0.2).scale(0.8, 0.8).step({
        duration: 0,
        timingFunction: 'linear'
      });
      that.animation2.translateX(-40).opacity(0.5).scale(1, 1).step({
        duration: 0,
        timingFunction: 'linear'
      });
      that.animation3.translateX(0).opacity(1).scale(1.4, 1.4).step({
        duration: 0,
        timingFunction: 'linear'
      });
      that.animation4.translateX(40).opacity(0.5).scale(1, 1).step({
        duration: 0,
        timingFunction: 'linear'
      });
      that.animation5.translateX(50).opacity(0.2).scale(0.8, 0.8).step({
        duration: 0,
        timingFunction: 'linear'
      });
      that.setData({
        animation1: animation1.export(),
        animation2: animation2.export(),
        animation3: animation3.export(),
        animation4: animation4.export(),
        animation5: animation5.export()
      })
    }.bind(this), 195)

    let array = this.data.clubs;
    let pop = array.pop();
    array.unshift(pop);

    setTimeout(function() {
      this.setData({
        clubs: array
      })
    }.bind(this), 195)
  },
  next: function(e) {
    var that = this
    console.log(e.currentTarget.dataset.index);
    // 点击完之后,把当前的地址push到原数组中，增加数据，就可实现无限循环了。
    // let array = that.data.list;
    // array.push(array[e.currentTarget.dataset.index]);
    // setTimeout(function () {
    //   that.setData({
    //     list: array
    //   })
    // }.bind(that), 195)

    var index = e.currentTarget.dataset.index + 1
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear',
    })
    that.animation = animation
    that.data.list.length
    // if (index == that.data.list.length){ //滑动到最后一个 就禁止滑动了
    //   return
    // }
    // else{
    let subject = exhibits[that.data.idx]
    var idx = that.data.idx += 1 //显示当前的是video 隐藏其他的video
    that.setData({
      idx: idx
    })
    animation.translateY(-that.data.height * index).step(1)
    that.setData({
      animationData: animation.export()
    })
    // }
    subject = exhibits[idx]
    if (subject.exhibitsVideo == '') {
      return
    }
    var id = subject.id //点击的按钮id
    console.log(id)
    console.log(this.data.playIndex) //正在播放的id
    if (!this.data.playIndex) { // 没有播放时播放视频
      this.setData({
        playIndex: id,
      })
      //console.log(this.data.playIndex)
      var videoContext = wx.createVideoContext(id)
      videoContext.seek(0)
      videoContext.play()
    } else { // 有播放时先将prev暂停，再播放当前点击的current
      console.log(this.data.playIndex)
      var videoContextPrev = wx.createVideoContext(this.data.playIndex)
      // videoContextPrev.seek(0)
      if (this.data.playIndex != id) { //不知道为什么，不加这个判断的时候这个视频会一直在播放和暂停之间切换
        videoContextPrev.pause()
      }
      this.setData({
        playIndex: id
      })
      var videoContextCurrent = wx.createVideoContext(this.data.playIndex, this)
      videoContextCurrent.seek(0)
      videoContextCurrent.play()
    }
  },
  // 非自动播放情况下 
  bindplay: function(e) {
    console.log(e)
    var id = e.currentTarget.id //点击id
    console.log(id)
    console.log(this.data.playIndex) //正在播放的id
    if (!this.data.playIndex) { // 没有播放时播放视频
      this.setData({
        playIndex: id,
      })
      var videoContext = wx.createVideoContext(id)
      videoContext.seek(0)
      videoContext.play()
    } else { // 有播放时先将prev暂停，再播放当前点击的current
      var videoContextPrev = wx.createVideoContext(this.data.playIndex)
      // videoContextPrev.seek(0)
      if (this.data.playIndex != id) { //不知道为什么，不加这个判断的时候这个视频会一直在播放和暂停之间切换
        videoContextPrev.pause()
      }
      this.setData({
        playIndex: id
      })
      var videoContextCurrent = wx.createVideoContext(this.data.playIndex)
      videoContextCurrent.seek(0)
      videoContextCurrent.play()
    }
  },
  //向上滑动事件
  scrollTop() {
    var that = this
    index++
    console.log(index)
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear',
    })
    that.animation = animation
    that.data.list.length
    // if (index == that.data.list.length){ //滑动到最后一个 就禁止滑动了
    //   return
    // }
    // else{
    var idx = that.data.idx += 1 //显示当前的是video 隐藏其他的video
    that.setData({
      idx: idx
    })
    animation.translateY(-that.data.height * index).step(1)
    that.setData({
      animationData: animation.export()
    })
    // }


    let array = this.data.list;
    array.push(array[index - 1]);

    setTimeout(function() {
      this.setData({
        list: array
      })
    }.bind(this), 195)
  },

  //向下滑动事件
  scrollBottom() {
    var that = this
    index--
    console.log(index)

    if (index <= 0) {
      index = 0
      return
    } else {

      var animation = wx.createAnimation({
        duration: 500,
        timingFunction: 'linear',
      })
      that.animation = animation
      that.data.list.length
      // if (index == that.data.list.length){ //滑动到最后一个 就禁止滑动了
      //   return
      // }
      // else{
      var idx = that.data.idx -= 1 //显示当前的是video 隐藏其他的video
      that.setData({
        idx: idx
      })
      animation.translateY(-that.data.height * index).step(1)
      that.setData({
        animationData: animation.export()
      })
      // }


      let array = this.data.list;
      array.push(array[index - 1]);

      setTimeout(function() {
        this.setData({
          list: array
        })
      }.bind(this), 195)
    }


  },

})



const res = {
  "result": 1,
  "msg": "成功",
  "data": {
    "posterList": [{
      "id": 1480,
      "poster": "1564492123383.jpg",
      "museum_id": 776,
      "posterUrl": "https://www.cni-expo.com/store/uploads/1564492123383.jpg"
    }],
    "orgnAddress": "",
    "museum": {
      "id": 776,
      "museumName": "安徽晋煤中能化工有限公司",
      "coverImage": "1564492103678.jpg",
      "introduction": "中能化工是集化肥、化工、热电联产、设备加工安装、压力容器制造于一体的综合性煤化工企业，为中国氮肥五十强、中国化工五百强、中国工业行业履行社会责任五星级企业。\n\n中能化工始建于1970年，前身为临泉化肥厂，1994年进行股份制改造，2003年改制为民营企业，2010年3月因发展需要更名为“安徽晋煤中能化工股份有限公司”，下辖三个子公司：安徽泉盛化工有限公司、阜阳安固公司锅炉压力容器制造有限公司、新疆中能万源化工有限公司。",
      "clickCount": 1850,
      "likeCount": 1,
      "collectCount": 5,
      "type": 1,
      "template": 1,
      "music": "https://www.cni-expo.com/store/uploads/1564734629411.mp3",
      "video": "https://www.cni-expo.com/store/uploads/1564533931242.mp4",
      "phone": "13695581575",
      "email": "64969874@qq.com",
      "address": "安徽省阜阳市临泉县临化路2号",
      "createTime": 1564127703000,
      "setMeal": {
        "id": 3,
        "name": "标准版",
        "type": 1,
        "imageNum": 500,
        "voiceNum": 500,
        "videoNum": 50,
        "videoMemory": 500,
        "topNum": 200,
        "template": 4,
        "sort": 0,
        "price": 5000,
        "threeModel": null,
        "rankRecommend": "一周",
        "logoUse": "1月",
        "excellentRecommend": "7天",
        "popularRecommend": "7天",
        "bannerUse": "无",
        "activityRelease": "15天",
        "isExperience": 0,
        "isDel": 0
      },
      "exhibits": [{
        "id": 7733,
        "rank": 0,
        "exhibitsName": "厂区里的高塔冲出云霄",
        "coverImage": "https://www.cni-expo.com/store/uploads/1564730084225.jpg",
        "exhibitsVideo": "",
        "exhibitsMusic": "https://www.cni-expo.com/store/uploads/1564725264774.mp3",
        "sortName": "临泉总部",
        "exhibitsIntroduce": "",
        "isDel": 0,
        "collectCount": 3,
        "orgnName": null,
        "museumId": 0,
        "status": 0,
        "isCollect": 0
      }, {
        "id": 7761,
        "rank": 0,
        "exhibitsName": "航天炉让一线员工觉得特别牛",
        "coverImage": "",
        "exhibitsVideo": "https://www.cni-expo.com/store/uploads/1565174947909.mp4",
        "exhibitsMusic": "",
        "sortName": "航天炉",
        "exhibitsIntroduce": "",
        "isDel": 0,
        "collectCount": 2,
        "orgnName": null,
        "museumId": 0,
        "status": 0,
        "isCollect": 0
      }, {
        "id": 7734,
        "rank": 0,
        "exhibitsName": "期待这个在建的第三期航天炉",
        "coverImage": "https://www.cni-expo.com/store/uploads/1564730079927.jpg",
        "exhibitsVideo": "",
        "exhibitsMusic": "https://www.cni-expo.com/store/uploads/1564725272255.mp3",
        "sortName": "临泉总部",
        "exhibitsIntroduce": "",
        "isDel": 0,
        "collectCount": 3,
        "orgnName": null,
        "museumId": 0,
        "status": 0,
        "isCollect": 0
      },{
        "id": 7739,
        "rank": 0,
        "exhibitsName": "凉水塔冒的不是烟，而是水蒸气",
        "coverImage": "https://www.cni-expo.com/store/uploads/1564730056684.jpg",
        "exhibitsVideo": "",
        "exhibitsMusic": "",
        "sortName": "临泉总部",
        "exhibitsIntroduce": "",
        "isDel": 0,
        "collectCount": 1,
        "orgnName": null,
        "museumId": 0,
        "status": 0,
        "isCollect": 0
      },
        {
          "id": 7816,
          "rank": 0,
          "exhibitsName": "热爱化工，过幸福生活",
          "coverImage": "",
          "exhibitsVideo": "https://www.cni-expo.com/store/uploads/1565175151745.mp4",
          "exhibitsMusic": "",
          "sortName": "张董事长",
          "exhibitsIntroduce": "张董事长讲话",
          "isDel": 0,
          "collectCount": 2,
          "orgnName": null,
          "museumId": 0,
          "status": 0,
          "isCollect": 0
        }],
      "imgCount": 0,
      "videoCount": 0,
      "musicCount": 0,
      "museumType": 0,
      "expiryTime": 1564416000000,
      "editStatus": false,
      "isDel": 0,
      "publishCount": 17,
      "status": 2,
      "auditRemarks": null,
      "applyAuditTime": 1564127844000,
      "auditPassTime": 1564546646000,
      "publishStatus": 2,
      "publishAuditRemarks": null,
      "publishApplyAuditTime": 1565176985000,
      "publishAuditPassTime": null,
      "link3D": null,
      "publish3DStatus": 1,
      "publishAudit3DRemarks": null,
      "publishApplyAudit3DTime": 1564486011000,
      "publishAuditPass3DTime": null,
      "threeDUrl": null,
      "setMealId": 0,
      "museumItem": null,
      "orgnMuseum": null,
      "industryMuseum": null,
      "regionMuseum": null,
      "countryMuseum": null,
      "themeMuseum": null,
      "customRecom": null,
      "customRecomName": "热门展馆第一名",
      "yestDayNum": 0,
      "thirtyDayNum": 0,
      "sumNum": 0,
      "yestDayTime": 0.0,
      "thirtyDayTime": 0.0,
      "sumTime": 0.0,
      "logo": null,
      "slogan": null,
      "orgnName": null,
      "province": null,
      "city": null,
      "industryStory": null,
      "likeStatus": 0,
      "isCollect": 1,
      "collectStatus": 0
    },
    "orgnEmail": "13650931938",
    "orgnLogo": "https://www.cni-expo.com/store/uploads/1564539503988.jpg",
    "orgnMobile": "",
    "museumArticle": {
      "page1": {
        "type5": [{
          "id": 0,
          "type": 5,
          "content": "",
          "rank": 0,
          "museumArticlePhoto": []
        }],
        "type4": [{
          "id": 0,
          "type": 4,
          "content": "",
          "rank": 0,
          "museumArticlePhoto": []
        }],
        "type3": [{
          "id": 0,
          "type": 3,
          "content": "",
          "rank": 0,
          "museumArticlePhoto": []
        }],
        "type2": [{
          "id": 0,
          "type": 2,
          "content": "",
          "rank": 0,
          "museumArticlePhoto": []
        }],
        "type8": [{
          "id": 0,
          "type": 8,
          "content": "",
          "rank": 0,
          "museumArticlePhoto": []
        }],
        "type7": [{
          "id": 0,
          "type": 7,
          "content": "",
          "rank": 0,
          "museumArticlePhoto": []
        }],
        "type6": [{
          "id": 0,
          "type": 6,
          "content": "",
          "rank": 0,
          "museumArticlePhoto": []
        }],
        "type1": [{
          "id": 0,
          "type": 1,
          "content": "",
          "rank": 0,
          "museumArticlePhoto": [{
            "id": 5831,
            "path": "1564533876357.jpg",
            "pathUrl": "https://www.cni-expo.com/store/uploads/1564533876357.jpg",
            "rank": 0
          }]
        }]
      }
    }
  }
}

const exhibits = res.data.museum.exhibits
const maxLen = exhibits.length - 1