if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  const _imports_0 = "/static/xiaoyuan.jpg";
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$1 = {
    data() {
      return {
        characterText: "小圆看起来很生气...",
        happinessLevel: 0,
        characterEmoji: "😢",
        moodColor: "#94A3B8",
        isHappy: false,
        message: "",
        showHearts: false,
        hearts: [],
        isAngryAnimation: false
      };
    },
    methods: {
      // 显示消息提示
      showMessage(text) {
        this.message = text;
        setTimeout(() => {
          this.message = "";
        }, 2e3);
      },
      // 获取进度条颜色
      getProgressColor() {
        if (this.happinessLevel >= 80)
          return "#FF9ED8";
        if (this.happinessLevel >= 50)
          return "#FFB6C1";
        if (this.happinessLevel >= 30)
          return "#FFD700";
        return "#FF6B6B";
      },
      // 创建爱心粒子效果
      createHeartParticles() {
        this.showHearts = true;
        this.hearts = [];
        for (let i = 0; i < 12; i++) {
          const left = Math.random() * 100;
          const top = Math.random() * 50;
          const scale = 0.5 + Math.random() * 1;
          const opacity = Math.random() * 0.8 + 0.2;
          const delay = Math.random() * 1;
          const heartObj = {
            style: {
              left: `${left}%`,
              top: `${top}%`,
              transform: `scale(${scale})`,
              opacity,
              animationDelay: `${delay}s`
            }
          };
          this.hearts.push(heartObj);
        }
        setTimeout(() => {
          this.showHearts = false;
          this.hearts = [];
        }, 2e3);
      },
      // 更新状态文本和动画
      updateStatus() {
        const moodState = this.getMoodState();
        this.characterEmoji = moodState.emoji;
        this.characterText = `小圆现在${moodState.text}！`;
        this.moodColor = moodState.color;
        if (this.happinessLevel >= 80) {
          this.isHappy = true;
          if (this.happinessLevel >= 90) {
            this.createHeartParticles();
          }
        } else if (this.happinessLevel >= 50) {
          this.isHappy = true;
        } else if (this.happinessLevel >= 30) {
          this.isHappy = false;
        } else {
          this.isHappy = false;
        }
      },
      // 增加开心指数
      increaseHappiness(amount) {
        this.happinessLevel += amount;
        this.updateStatus();
      },
      // 获取心情状态 - 20+个状态等级
      getMoodState() {
        const level = this.happinessLevel;
        if (level < 10)
          return { emoji: "😢", text: "极度伤心", color: "#94A3B8" };
        if (level < 20)
          return { emoji: "😔", text: "非常难过", color: "#94A3B8" };
        if (level < 30)
          return { emoji: "😟", text: "有点低落", color: "#CBD5E1" };
        if (level < 40)
          return { emoji: "😐", text: "面无表情", color: "#E2E8F0" };
        if (level < 50)
          return { emoji: "🙂", text: "有点开心", color: "#A3E635" };
        if (level < 60)
          return { emoji: "😊", text: "心情不错", color: "#86EFAC" };
        if (level < 70)
          return { emoji: "😃", text: "开心", color: "#4ADE80" };
        if (level < 80)
          return { emoji: "😄", text: "很开心", color: "#22C55E" };
        if (level < 90)
          return { emoji: "😆", text: "非常开心", color: "#10B981" };
        if (level < 100)
          return { emoji: "😁", text: "超级开心", color: "#059669" };
        if (level < 120)
          return { emoji: "🥰", text: "心花怒放", color: "#EC4899" };
        if (level < 140)
          return { emoji: "😍", text: "欣喜若狂", color: "#DB2777" };
        if (level < 160)
          return { emoji: "🤩", text: "兴奋不已", color: "#BE185D" };
        if (level < 180)
          return { emoji: "🥳", text: "欢天喜地", color: "#9D174D" };
        if (level < 200)
          return { emoji: "✨", text: "光芒四射", color: "#7C3AED" };
        if (level < 250)
          return { emoji: "💖", text: "幸福满溢", color: "#8B5CF6" };
        if (level < 300)
          return { emoji: "🌟", text: "星光熠熠", color: "#6D28D9" };
        if (level < 400)
          return { emoji: "💫", text: "飘飘欲仙", color: "#5B21B6" };
        if (level < 500)
          return { emoji: "🌈", text: "如沐春风", color: "#4C1D95" };
        if (level < 600)
          return { emoji: "💯", text: "幸福至极", color: "#3B0764" };
        if (level < 800)
          return { emoji: "❤️", text: "心满意足", color: "#831843" };
        if (level < 1e3)
          return { emoji: "💝", text: "爱意满满", color: "#500724" };
        return { emoji: "👑", text: "幸福女王", color: "#7E22CE" };
      },
      // 道歉按钮
      saySorry() {
        this.increaseHappiness(5);
        const sorryMessages = [
          "小圆，我真的知道错了，你能原谅我吗？",
          "对不起小圆，我不应该惹你生气的...",
          "小圆，我保证以后再也不这样做了！",
          "小圆，你生气的样子让我好心疼...",
          "我知道我错了，小圆，给我一个改过自新的机会吧！",
          "小圆，我真的很后悔，你能消消气吗？",
          "对不起小圆，我刚才太冲动了...",
          "小圆，都是我的错，请你原谅我！",
          "小圆，我愿意做任何事情来弥补我的过错！",
          "小圆，你不开心我也不开心...",
          "对不起小圆，我不应该忽略你的感受...",
          "小圆，我错了，以后一定听你的话！",
          "小圆，别生气了，我给你买你最喜欢的奶茶好不好？",
          "对不起小圆，我刚才太笨了...",
          "小圆，我保证这是最后一次！",
          "小圆，你骂我两句出出气吧，只要你能开心起来...",
          "对不起小圆，我不应该和你顶嘴...",
          "小圆，我知道你为我好，我以后一定改正！",
          "小圆，别不理我好不好？我真的知道错了...",
          "对不起小圆，我会用行动证明我的诚意的！",
          "小圆，你是最重要的人，我不应该让你难过...",
          "对不起小圆，我刚才太自私了...",
          "小圆，我愿意陪你做任何你想做的事情！",
          "小圆，别生气了，笑一个嘛~"
        ];
        const randomMessage = sorryMessages[Math.floor(Math.random() * sorryMessages.length)];
        this.showMessage(randomMessage);
      },
      // 送礼物按钮
      giveGift() {
        const giftMessages = [
          "小圆，这是我特意为你挑选的限量版小蛋糕，希望你喜欢！",
          "送给小圆一束新鲜的玫瑰花，就像你一样美丽动人~",
          "小圆，这个可爱的猫咪毛绒玩具和你一样可爱！",
          "亲手为小圆做的巧克力，每一颗都代表我的心意~",
          "小圆，这张卡片里写满了我想对你说的话...",
          "小圆，这个精致的手链是我挑了很久才选到的！",
          "送给小圆最喜欢的香水，希望你每天都香香的~",
          "小圆，这盒马卡龙的颜色和你今天的衣服很配哦！",
          "小圆，这个迷你多肉植物就像你一样需要细心呵护~",
          "小圆，这是我为你定制的钥匙扣，上面有我们的名字~",
          "送给小圆一条温暖的围巾，希望能在冬天给你带来温暖~",
          "小圆，这盒巧克力每一颗都有不同的味道，就像我们的回忆一样丰富多彩~",
          "小圆，这束向日葵代表我对你的喜欢，永远向着你！",
          "小圆，这个可爱的抱枕陪你睡觉，就像我在你身边一样~",
          "送给小圆一本精美的笔记本，记录我们的美好时光~",
          "小圆，这个水晶球里的场景是不是很像我们第一次见面的地方？",
          "小圆，这盒糖果是你小时候最喜欢的味道，我找了好久才找到~",
          "送给小圆一对可爱的耳环，戴上一定很好看！",
          "小圆，这个音乐盒打开会播放我们第一次约会时听到的歌曲~",
          "小圆，这盒饼干是我按照你的口味亲手做的，尝尝看！",
          "送给小圆一个小巧的相机，记录我们的每一个美好瞬间~",
          "小圆，这个书签上的话是我最想对你说的...",
          "小圆，这盒茶叶是你喜欢的清香型，希望你喜欢~",
          "送给小圆一个温暖的手套，冬天再也不怕冻手了！",
          "小圆，这个手机壳上的图案是不是很可爱？和你一样~"
        ];
        const randomMessage = giftMessages[Math.floor(Math.random() * giftMessages.length)];
        this.increaseHappiness(8);
        this.showMessage(randomMessage);
      },
      // 讲笑话按钮
      makeJoke() {
        const jokes = [
          "小圆，你知道为什么我每天都很开心吗？因为我的生活里有你这个开心果！",
          '小圆，昨天我梦见你变成了一个冰淇淋，我刚要吃，你突然开口说："要慢慢吃哦，不然会化掉的~"',
          "小圆，你知道什么动物最会哄人开心吗？是小猫咪，就像你一样可爱又粘人！",
          '小圆，我昨天学会了一个新成语，叫"圆圆满满"，用来形容有你的生活最合适了！',
          "小圆，你知道为什么月亮有时候圆有时候弯吗？因为它也在模仿你的笑脸呀！",
          "小圆，我刚才看到一个镜子，里面有个超级可爱的人，你猜是谁？哈哈，是你呀！",
          '小圆，今天有人问我喜欢什么形状，我毫不犹豫地说："圆形，因为它让我想起了你！"',
          "小圆，你知道为什么我总是迷路吗？因为你的笑容让我迷失了方向~",
          "小圆，昨天我数星星，数着数着突然发现，最亮的那颗星星好像你的眼睛！",
          "小圆，你知道我最喜欢什么季节吗？是你在的季节，因为每天都像春天一样温暖！",
          "小圆，我刚才做了个测试，结果显示我最喜欢的人是你，你看，连测试都知道！",
          "小圆，你知道为什么我总是饿吗？因为你的笑容让我胃口大开！",
          "小圆，昨天我在沙滩上写了你的名字，结果海浪都来帮忙，把你的名字冲得更大了！",
          "小圆，你知道我为什么喜欢拍照吗？因为我想把你的每一个笑容都记录下来！",
          '小圆，今天我问风，怎样才能让你开心，风说："只要你在她身边就够了。"',
          "小圆，你知道我最喜欢听什么声音吗？是你笑起来的声音，比任何音乐都好听！",
          "小圆，昨天我画了一幅画，画的是我们的未来，里面充满了幸福和欢笑~",
          "小圆，你知道为什么我总是早起吗？因为我想早点看到你的笑容！",
          '小圆，我刚才看到一朵特别漂亮的花，它说它叫"小圆花"，因为和你一样美丽！',
          "小圆，你知道我为什么喜欢下雨天吗？因为我们可以一起撑伞，靠得更近~",
          '小圆，昨天我做了个梦，梦见你变成了天使，结果你说："我本来就是你的天使呀！"',
          "小圆，你知道为什么我喜欢吃甜的吗？因为你的笑容比糖还甜！",
          "小圆，今天我学会了一个新魔法，就是让你开心的魔法，你想试试吗？",
          "小圆，你知道我为什么喜欢看书吗？因为每一页都让我想起你！",
          '小圆，昨天我对着镜子练习微笑，结果镜子里的我突然说："你笑起来好像小圆！"'
        ];
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        this.increaseHappiness(4);
        this.showMessage(randomJoke);
      },
      // 夸奖按钮
      compliment() {
        const compliments = [
          "小圆今天的笑容比阳光还要灿烂！",
          "小圆穿什么都好看，真是天生的衣架子！",
          "小圆的眼睛真漂亮，就像会说话一样~",
          "小圆的声音真好听，听你说话就是一种享受！",
          "小圆真的很温柔，每次和你在一起都感觉很安心~",
          "小圆做的饭真的太好吃了，我可以吃一辈子！",
          "小圆真聪明，什么问题都难不倒你！",
          "小圆的手真巧，做什么都那么精致！",
          "小圆的性格真好，和你相处真的很舒服！",
          "小圆笑起来的时候，整个世界都明亮了~",
          "小圆真的很善良，总是为别人着想！",
          "小圆的品味真好，选什么都那么有眼光！",
          "小圆真的很勇敢，面对困难从不退缩！",
          "小圆的皮肤真好，就像婴儿一样光滑！",
          "小圆真的很细心，总是能注意到别人忽略的细节！",
          "小圆的发型真好看，很适合你！",
          "小圆真的很有耐心，从来不会随便生气！",
          "小圆的身材真好，穿什么都好看！",
          "小圆真的很有才华，什么都会！",
          "小圆的名字真好听，和你的人一样可爱！",
          "小圆真的很有气质，走到哪里都是焦点！",
          "小圆的眼睛里有星星，一眨一眨的真可爱！",
          "小圆真的很独立，什么事情都能自己做好！",
          "小圆笑起来有小酒窝，真的太可爱了！",
          "小圆真的很有爱心，对小动物都那么温柔！",
          "小圆的笑容是我每天最大的动力！",
          "小圆真的很特别，和别人都不一样！",
          "小圆的怀抱真温暖，让人不想离开！",
          "小圆真的很会照顾人，和你在一起很幸福！",
          "小圆的声音真治愈，听你说话烦恼都没了！"
        ];
        const randomCompliment = compliments[Math.floor(Math.random() * compliments.length)];
        this.increaseHappiness(6);
        this.showMessage(randomCompliment);
      },
      // 拥抱按钮
      hug() {
        this.increaseHappiness(10);
        const hugMessages = [
          "(给小圆一个温暖的拥抱)你知道吗？你的拥抱是我一天中最期待的事情~",
          "(紧紧抱着小圆)有你在怀里，感觉整个世界都安静了~",
          "(轻轻抱着小圆)你的体温让我感觉好温暖~",
          "(温柔地拥抱小圆)好想就这样一直抱着你不放手~",
          "(给小圆一个熊抱)你知道吗？你的拥抱有治愈一切的力量~",
          "(抱着小圆转圈)和你拥抱的感觉真的太好了！",
          "(轻轻拍着小圆的背)别怕，有我在呢~",
          "(把头埋在小圆的头发里)你身上的味道真好闻~",
          "(紧紧抱着小圆)今天过得好吗？不管怎样，我都在这里~",
          "(给小圆一个暖暖的拥抱)有你在身边，真好~",
          "(抱着小圆不放)我好像有点贪心，不想松开你~",
          "(温柔地拥抱小圆)今天辛苦了，让我抱抱你~",
          "(给小圆一个大大的拥抱)看到你就忍不住想抱抱你~",
          "(抱着小圆轻摇)你知道吗？你的拥抱是最好的安慰~",
          "(紧紧抱着小圆)谢谢你一直在我身边~",
          "(给小圆一个甜甜的拥抱)今天有没有想我呀？",
          "(抱着小圆不放)我觉得我可能抱不够了~",
          "(温柔地拥抱小圆)你是我的避风港~",
          "(给小圆一个充满爱的拥抱)我爱你~",
          "(抱着小圆转圈)和你在一起的每一刻都很开心~",
          "(轻轻抱着小圆)今天的你特别可爱~",
          "(紧紧抱着小圆)有你真好~",
          "(给小圆一个安慰的拥抱)不管发生什么，我都会陪着你~",
          "(抱着小圆不放手)我好像上瘾了，你的拥抱太舒服了~",
          "(温柔地拥抱小圆)你知道吗？你是我最重要的人~"
        ];
        const randomMessage = hugMessages[Math.floor(Math.random() * hugMessages.length)];
        this.showMessage(randomMessage);
        this.createHeartParticles();
      },
      // 击掌按钮
      highFive() {
        this.increaseHappiness(7);
        const highFiveMessages = [
          "(和小圆击掌)小圆真厉害！",
          "(开心地和小圆击掌)太棒了！我们配合得真默契~",
          "(和小圆击掌)小圆今天表现超棒！",
          "(用力击掌)小圆真的太厉害了，我崇拜你！",
          "(轻轻击掌)小圆真聪明，这么快就学会了~",
          "(和小圆击掌)耶！我们成功了！",
          "(击掌三次)小圆三连击，超厉害！",
          "(和小圆击掌)小圆的手真软~",
          "(开心击掌)小圆好样的！",
          "(和小圆击掌)今天的小圆特别棒！",
          "(击掌)小圆真的很努力呢！",
          "(和小圆击掌)小圆的进步真快！",
          "(击掌)小圆最棒了！",
          "(和小圆击掌)我们真是最佳拍档！",
          "(击掌)小圆好聪明！",
          "(和小圆击掌)今天又学到了新技能，小圆太厉害了！",
          "(击掌)小圆的反应真快！",
          "(和小圆击掌)小圆真的很有天赋！",
          "(击掌)小圆的点子真多！",
          "(和小圆击掌)和你在一起做什么都很开心！",
          "(击掌)小圆的观察力真强！",
          "(和小圆击掌)小圆的记忆力真好！",
          "(击掌)小圆的想象力真丰富！",
          "(和小圆击掌)小圆的品味真好！",
          "(击掌)小圆的笑容最治愈了！"
        ];
        const randomMessage = highFiveMessages[Math.floor(Math.random() * highFiveMessages.length)];
        this.showMessage(randomMessage);
      },
      // 惹小圆生气按钮
      annoyXiaoyuan() {
        const annoyedMessages = [
          "嘿小圆，你今天的头发有点乱哦~",
          "小圆，昨天你做的饭好像有点咸...",
          "小圆，我忘记带你喜欢的零食了！",
          "小圆，你走路的样子好像小鸭子，哈哈~",
          "小圆，你刚才说错话了！",
          "小圆，你好像又胖了一点...",
          "小圆，你的衣服好像穿反了！",
          "小圆，我把你的化妆品弄倒了...",
          "小圆，我忘记今天是什么日子了...",
          "小圆，你生气的样子也很可爱！",
          "小圆，你今天话有点多哦~",
          "小圆，你选的电影真的不好看...",
          "小圆，我刚才看到比你更可爱的女生了！",
          "小圆，你的手机壁纸为什么不是我？",
          "小圆，你今天的妆好像化得有点浓...",
          "小圆，你刚才唱歌跑调了！",
          "小圆，你选的餐厅真的好贵...",
          "小圆，我刚才偷偷吃了你最后一块巧克力...",
          "小圆，你刚才自拍的时候表情好僵...",
          "小圆，你今天的香水味好像太浓了...",
          "小圆，你居然不记得我上次送你的礼物是什么！",
          "小圆，你打字的速度真慢！",
          "小圆，你刚才讲的笑话一点都不好笑...",
          "小圆，你居然不喜欢吃我最喜欢的零食！",
          "小圆，你今天穿的衣服好像上次穿过了...",
          "小圆，你刚才走路差点摔倒，哈哈！",
          "小圆，你居然不记得我们第一次见面的地方！",
          "小圆，你整理的房间还是有点乱...",
          "小圆，你刚才看帅哥的眼神我都看到了！",
          "小圆，你居然觉得我最好的朋友比我帅！"
        ];
        const randomMessage = annoyedMessages[Math.floor(Math.random() * annoyedMessages.length)];
        this.showMessage(randomMessage);
        this.isAngryAnimation = true;
        setTimeout(() => {
          this.isAngryAnimation = false;
        }, 1e3);
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "bg-decoration" }, [
        vue.createElementVNode("view", { class: "bg-bubble bubble-1" }),
        vue.createElementVNode("view", { class: "bg-bubble bubble-2" }),
        vue.createElementVNode("view", { class: "bg-bubble bubble-3" }),
        vue.createElementVNode("view", { class: "bg-bubble bubble-4" }),
        vue.createElementVNode("view", { class: "bg-bubble bubble-5" })
      ]),
      vue.createElementVNode("view", { class: "header" }, [
        vue.createElementVNode("text", { class: "header-title" }, "宇崎崎想要哄小圆开心"),
        vue.createElementVNode("view", { class: "header-subtitle" }, "小圆开心起来~")
      ]),
      vue.createElementVNode("view", { class: "character-area" }, [
        vue.createElementVNode("view", { class: "character-frame" }, [
          vue.createElementVNode(
            "image",
            {
              class: vue.normalizeClass(["character-img", {
                "happy": $data.isHappy && $data.happinessLevel >= 50,
                "angry": !$data.isHappy && $data.happinessLevel < 30,
                "excited": $data.happinessLevel >= 90,
                "neutral": $data.happinessLevel >= 30 && $data.happinessLevel < 50
              }]),
              src: _imports_0,
              mode: "aspectFit"
            },
            null,
            2
            /* CLASS */
          ),
          vue.createElementVNode(
            "view",
            {
              class: "mood-indicator",
              style: vue.normalizeStyle({ color: $data.moodColor })
            },
            [
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString($data.characterEmoji || "😐"),
                1
                /* TEXT */
              )
            ],
            4
            /* STYLE */
          )
        ]),
        vue.createElementVNode(
          "text",
          { class: "character-text" },
          vue.toDisplayString($data.characterText),
          1
          /* TEXT */
        ),
        $data.showHearts ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "hearts-container"
        }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.hearts, (heart, index) => {
              return vue.openBlock(), vue.createElementBlock(
                "view",
                {
                  key: index,
                  class: "heart",
                  style: vue.normalizeStyle(heart.style)
                },
                null,
                4
                /* STYLE */
              );
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])) : vue.createCommentVNode("v-if", true)
      ]),
      vue.createElementVNode("view", { class: "button-area" }, [
        vue.createElementVNode("view", { class: "button-column" }, [
          vue.createElementVNode("button", {
            class: "interaction-btn btn-apology",
            onClick: _cache[0] || (_cache[0] = (...args) => $options.saySorry && $options.saySorry(...args))
          }, [
            vue.createElementVNode("view", { class: "btn-content" }, [
              vue.createElementVNode("text", { class: "btn-icon" }, "🙇"),
              vue.createElementVNode("text", { class: "btn-text" }, "道歉")
            ]),
            vue.createElementVNode("view", { class: "btn-effect" })
          ]),
          vue.createElementVNode("button", {
            class: "interaction-btn btn-gift",
            onClick: _cache[1] || (_cache[1] = (...args) => $options.giveGift && $options.giveGift(...args))
          }, [
            vue.createElementVNode("view", { class: "btn-content" }, [
              vue.createElementVNode("text", { class: "btn-icon" }, "🎁"),
              vue.createElementVNode("text", { class: "btn-text" }, "送礼物")
            ]),
            vue.createElementVNode("view", { class: "btn-effect" })
          ]),
          vue.createElementVNode("button", {
            class: "interaction-btn btn-joke",
            onClick: _cache[2] || (_cache[2] = (...args) => $options.makeJoke && $options.makeJoke(...args))
          }, [
            vue.createElementVNode("view", { class: "btn-content" }, [
              vue.createElementVNode("text", { class: "btn-icon" }, "😂"),
              vue.createElementVNode("text", { class: "btn-text" }, "讲笑话")
            ]),
            vue.createElementVNode("view", { class: "btn-effect" })
          ]),
          vue.createElementVNode("button", {
            class: "interaction-btn btn-compliment",
            onClick: _cache[3] || (_cache[3] = (...args) => $options.compliment && $options.compliment(...args))
          }, [
            vue.createElementVNode("view", { class: "btn-content" }, [
              vue.createElementVNode("text", { class: "btn-icon" }, "✨"),
              vue.createElementVNode("text", { class: "btn-text" }, "夸奖")
            ]),
            vue.createElementVNode("view", { class: "btn-effect" })
          ]),
          vue.createElementVNode("button", {
            class: "interaction-btn btn-hug",
            onClick: _cache[4] || (_cache[4] = (...args) => $options.hug && $options.hug(...args))
          }, [
            vue.createElementVNode("view", { class: "btn-content" }, [
              vue.createElementVNode("text", { class: "btn-icon" }, "🤗"),
              vue.createElementVNode("text", { class: "btn-text" }, "拥抱")
            ]),
            vue.createElementVNode("view", { class: "btn-effect" })
          ]),
          vue.createElementVNode("button", {
            class: "interaction-btn btn-highfive",
            onClick: _cache[5] || (_cache[5] = (...args) => $options.highFive && $options.highFive(...args))
          }, [
            vue.createElementVNode("view", { class: "btn-content" }, [
              vue.createElementVNode("text", { class: "btn-icon" }, "🖐️"),
              vue.createElementVNode("text", { class: "btn-text" }, "击掌")
            ]),
            vue.createElementVNode("view", { class: "btn-effect" })
          ]),
          $data.happinessLevel >= 100 ? (vue.openBlock(), vue.createElementBlock("button", {
            key: 0,
            class: "interaction-btn btn-annoy",
            onClick: _cache[6] || (_cache[6] = (...args) => $options.annoyXiaoyuan && $options.annoyXiaoyuan(...args))
          }, [
            vue.createElementVNode("view", { class: "btn-content" }, [
              vue.createElementVNode("text", { class: "btn-icon" }, "😈"),
              vue.createElementVNode("text", { class: "btn-text" }, "惹小圆生气")
            ]),
            vue.createElementVNode("view", { class: "btn-effect" })
          ])) : vue.createCommentVNode("v-if", true)
        ])
      ]),
      vue.createElementVNode("view", { class: "status-area" }, [
        vue.createElementVNode("view", { class: "status-header" }, [
          vue.createElementVNode("text", { class: "status-text" }, "开心指数"),
          vue.createElementVNode(
            "text",
            { class: "status-level" },
            vue.toDisplayString($data.happinessLevel),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "progress-bar" }, [
          vue.createElementVNode(
            "view",
            {
              class: "progress-fill",
              style: vue.normalizeStyle({ width: $data.happinessLevel + "%", background: $options.getProgressColor() })
            },
            [
              $data.happinessLevel > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "progress-sparkle"
              })) : vue.createCommentVNode("v-if", true)
            ],
            4
            /* STYLE */
          )
        ])
      ]),
      $data.message ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 0,
          class: vue.normalizeClass(["message-box", { "happy-message": $data.happinessLevel >= 50 }])
        },
        [
          vue.createElementVNode(
            "text",
            { class: "message-text" },
            vue.toDisplayString($data.message),
            1
            /* TEXT */
          )
        ],
        2
        /* CLASS */
      )) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode("view", { class: "footer" }, [
        vue.createElementVNode("text", { class: "footer-text" }, "继续努力让小圆开心起来吧！")
      ])
    ]);
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"], ["__file", "D:/HX_projects/小圆要开心喵/pages/index/index.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:10", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "D:/HX_projects/小圆要开心喵/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
