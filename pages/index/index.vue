<template>
	<view class="container">
		<!-- 背景装饰元素 -->
		<view class="bg-decoration">
			<view class="bg-bubble bubble-1"></view>
			<view class="bg-bubble bubble-2"></view>
			<view class="bg-bubble bubble-3"></view>
			<view class="bg-bubble bubble-4"></view>
			<view class="bg-bubble bubble-5"></view>
		</view>
		
		<!-- 头部标题 -->
		<view class="header">
			<text class="header-title">宇崎崎想要哄小圆开心</text>
			<view class="header-subtitle">小圆开心起来~</view>
		</view>
		
		<!-- 角色展示区域 -->
		<view class="character-area">
			<view class="character-frame">
				<image :class="['character-img', { 
					'happy': isHappy && happinessLevel >= 50, 
					'angry': !isHappy && happinessLevel < 30, 
					'excited': happinessLevel >= 90,
					'neutral': happinessLevel >= 30 && happinessLevel < 50
				}]" src="/static/xiaoyuan.jpg" mode="aspectFit"></image>
				
				<!-- 心情表情指示器 -->
				<view class="mood-indicator" :style="{ color: moodColor }">
					<text>{{ characterEmoji || '😐' }}</text>
				</view>
			</view>
			
			<text class="character-text">{{characterText}}</text>
			
			<!-- 爱心粒子效果 -->
			<view v-if="showHearts" class="hearts-container">
				<view v-for="(heart, index) in hearts" :key="index" class="heart" :style="heart.style"></view>
			</view>
		</view>
		
		<!-- 互动按钮区域 - 优化布局 -->
		<view class="button-area">
			<view class="button-column">
				<button class="interaction-btn btn-apology" @click="saySorry">
					<view class="btn-content">
						<text class="btn-icon">🙇</text>
						<text class="btn-text">道歉</text>
					</view>
					<view class="btn-effect"></view>
				</button>
				<button class="interaction-btn btn-gift" @click="giveGift">
					<view class="btn-content">
						<text class="btn-icon">🎁</text>
						<text class="btn-text">送礼物</text>
					</view>
					<view class="btn-effect"></view>
				</button>
				<button class="interaction-btn btn-joke" @click="makeJoke">
					<view class="btn-content">
						<text class="btn-icon">😂</text>
						<text class="btn-text">讲笑话</text>
					</view>
					<view class="btn-effect"></view>
				</button>
				<button class="interaction-btn btn-compliment" @click="compliment">
					<view class="btn-content">
						<text class="btn-icon">✨</text>
						<text class="btn-text">夸奖</text>
					</view>
					<view class="btn-effect"></view>
				</button>
				<button class="interaction-btn btn-hug" @click="hug">
					<view class="btn-content">
						<text class="btn-icon">🤗</text>
						<text class="btn-text">拥抱</text>
					</view>
					<view class="btn-effect"></view>
				</button>
				<button class="interaction-btn btn-highfive" @click="highFive">
					<view class="btn-content">
						<text class="btn-icon">🖐️</text>
						<text class="btn-text">击掌</text>
					</view>
					<view class="btn-effect"></view>
				</button>
				<button class="interaction-btn btn-annoy" v-if="happinessLevel >= 100" @click="annoyXiaoyuan">
					<view class="btn-content">
						<text class="btn-icon">😈</text>
						<text class="btn-text">惹小圆生气</text>
					</view>
					<view class="btn-effect"></view>
				</button>
			</view>
		</view>
		
		<!-- 状态显示区域 -->
		<view class="status-area">
			<view class="status-header">
				<text class="status-text">开心指数</text>
				<text class="status-level">{{happinessLevel}}</text>
			</view>
			<view class="progress-bar">
				<view class="progress-fill" :style="{ width: happinessLevel + '%', background: getProgressColor() }">
					<view class="progress-sparkle" v-if="happinessLevel > 0"></view>
				</view>
			</view>
		</view>
		
		<!-- 消息提示区域 -->
		<view v-if="message" class="message-box" :class="{ 'happy-message': happinessLevel >= 50 }">
			<text class="message-text">{{message}}</text>
		</view>
		
		<!-- 底部装饰 -->
		<view class="footer">
			<text class="footer-text">继续努力让小圆开心起来吧！</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				characterText: '小圆看起来很生气...',
				happinessLevel: 0,
				characterEmoji: '😢',
				moodColor: '#94A3B8',
				isHappy: false,
				message: '',
				showHearts: false,
				hearts: [],
				isAngryAnimation: false
			}
		},
		methods: {
			// 显示消息提示
			showMessage(text) {
				this.message = text;
				setTimeout(() => {
					this.message = '';
				}, 2000);
			},
			
			// 获取进度条颜色
			getProgressColor() {
				if (this.happinessLevel >= 80) return '#FF9ED8';
				if (this.happinessLevel >= 50) return '#FFB6C1';
				if (this.happinessLevel >= 30) return '#FFD700';
				return '#FF6B6B';
			},
			
			// 创建爱心粒子效果
			createHeartParticles() {
				this.showHearts = true;
				this.hearts = [];
				for (let i = 0; i < 12; i++) {
					const left = (Math.random() * 100);
					const top = (Math.random() * 50);
					const scale = 0.5 + Math.random() * 1;
					const opacity = Math.random() * 0.8 + 0.2;
					const delay = Math.random() * 1;
					
					const heartObj = { 
						style: {
							left: `${left}%`, 
							top: `${top}%`, 
							transform: `scale(${scale})`, 
							opacity: opacity,
							animationDelay: `${delay}s`
						}
					};
					
					this.hearts.push(heartObj);
				}
				setTimeout(() => {
					this.showHearts = false;
					this.hearts = [];
				}, 2000);
			},
			
			// 更新状态文本和动画
			updateStatus() {
				const moodState = this.getMoodState();
				this.characterEmoji = moodState.emoji;
				this.characterText = `小圆现在${moodState.text}！`;
				this.moodColor = moodState.color;
				
				if (this.happinessLevel >= 80) {
					this.isHappy = true;
					// 当开心指数达到90时显示爱心粒子
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
				if (level < 10) return { emoji: '😢', text: '极度伤心', color: '#94A3B8' };
				if (level < 20) return { emoji: '😔', text: '非常难过', color: '#94A3B8' };
				if (level < 30) return { emoji: '😟', text: '有点低落', color: '#CBD5E1' };
				if (level < 40) return { emoji: '😐', text: '面无表情', color: '#E2E8F0' };
				if (level < 50) return { emoji: '🙂', text: '有点开心', color: '#A3E635' };
				if (level < 60) return { emoji: '😊', text: '心情不错', color: '#86EFAC' };
				if (level < 70) return { emoji: '😃', text: '开心', color: '#4ADE80' };
				if (level < 80) return { emoji: '😄', text: '很开心', color: '#22C55E' };
				if (level < 90) return { emoji: '😆', text: '非常开心', color: '#10B981' };
				if (level < 100) return { emoji: '😁', text: '超级开心', color: '#059669' };
				if (level < 120) return { emoji: '🥰', text: '心花怒放', color: '#EC4899' };
				if (level < 140) return { emoji: '😍', text: '欣喜若狂', color: '#DB2777' };
				if (level < 160) return { emoji: '🤩', text: '兴奋不已', color: '#BE185D' };
				if (level < 180) return { emoji: '🥳', text: '欢天喜地', color: '#9D174D' };
				if (level < 200) return { emoji: '✨', text: '光芒四射', color: '#7C3AED' };
				if (level < 250) return { emoji: '💖', text: '幸福满溢', color: '#8B5CF6' };
				if (level < 300) return { emoji: '🌟', text: '星光熠熠', color: '#6D28D9' };
				if (level < 400) return { emoji: '💫', text: '飘飘欲仙', color: '#5B21B6' };
				if (level < 500) return { emoji: '🌈', text: '如沐春风', color: '#4C1D95' };
				if (level < 600) return { emoji: '💯', text: '幸福至极', color: '#3B0764' };
				if (level < 800) return { emoji: '❤️', text: '心满意足', color: '#831843' };
				if (level < 1000) return { emoji: '💝', text: '爱意满满', color: '#500724' };
				return { emoji: '👑', text: '幸福女王', color: '#7E22CE' };
			},
			
			// 道歉按钮
			saySorry() {
				this.increaseHappiness(5);
				const sorryMessages = [
					'小圆，我真的知道错了，你能原谅我吗？',
					'对不起小圆，我不应该惹你生气的...',
					'小圆，我保证以后再也不这样做了！',
					'小圆，你生气的样子让我好心疼...',
					'我知道我错了，小圆，给我一个改过自新的机会吧！',
					'小圆，我真的很后悔，你能消消气吗？',
					'对不起小圆，我刚才太冲动了...',
					'小圆，都是我的错，请你原谅我！',
					'小圆，我愿意做任何事情来弥补我的过错！',
					'小圆，你不开心我也不开心...',
					'对不起小圆，我不应该忽略你的感受...',
					'小圆，我错了，以后一定听你的话！',
					'小圆，别生气了，我给你买你最喜欢的奶茶好不好？',
					'对不起小圆，我刚才太笨了...',
					'小圆，我保证这是最后一次！',
					'小圆，你骂我两句出出气吧，只要你能开心起来...',
					'对不起小圆，我不应该和你顶嘴...',
					'小圆，我知道你为我好，我以后一定改正！',
					'小圆，别不理我好不好？我真的知道错了...',
					'对不起小圆，我会用行动证明我的诚意的！',
					'小圆，你是最重要的人，我不应该让你难过...',
					'对不起小圆，我刚才太自私了...',
					'小圆，我愿意陪你做任何你想做的事情！',
					'小圆，别生气了，笑一个嘛~'
				];
				const randomMessage = sorryMessages[Math.floor(Math.random() * sorryMessages.length)];
				this.showMessage(randomMessage);
			},
			
			// 送礼物按钮
			giveGift() {
				const giftMessages = [
					'小圆，这是我特意为你挑选的限量版小蛋糕，希望你喜欢！',
					'送给小圆一束新鲜的玫瑰花，就像你一样美丽动人~',
					'小圆，这个可爱的猫咪毛绒玩具和你一样可爱！',
					'亲手为小圆做的巧克力，每一颗都代表我的心意~',
					'小圆，这张卡片里写满了我想对你说的话...',
					'小圆，这个精致的手链是我挑了很久才选到的！',
					'送给小圆最喜欢的香水，希望你每天都香香的~',
					'小圆，这盒马卡龙的颜色和你今天的衣服很配哦！',
					'小圆，这个迷你多肉植物就像你一样需要细心呵护~',
					'小圆，这是我为你定制的钥匙扣，上面有我们的名字~',
					'送给小圆一条温暖的围巾，希望能在冬天给你带来温暖~',
					'小圆，这盒巧克力每一颗都有不同的味道，就像我们的回忆一样丰富多彩~',
					'小圆，这束向日葵代表我对你的喜欢，永远向着你！',
					'小圆，这个可爱的抱枕陪你睡觉，就像我在你身边一样~',
					'送给小圆一本精美的笔记本，记录我们的美好时光~',
					'小圆，这个水晶球里的场景是不是很像我们第一次见面的地方？',
					'小圆，这盒糖果是你小时候最喜欢的味道，我找了好久才找到~',
					'送给小圆一对可爱的耳环，戴上一定很好看！',
					'小圆，这个音乐盒打开会播放我们第一次约会时听到的歌曲~',
					'小圆，这盒饼干是我按照你的口味亲手做的，尝尝看！',
					'送给小圆一个小巧的相机，记录我们的每一个美好瞬间~',
					'小圆，这个书签上的话是我最想对你说的...',
					'小圆，这盒茶叶是你喜欢的清香型，希望你喜欢~',
					'送给小圆一个温暖的手套，冬天再也不怕冻手了！',
					'小圆，这个手机壳上的图案是不是很可爱？和你一样~'
				];
				const randomMessage = giftMessages[Math.floor(Math.random() * giftMessages.length)];
				this.increaseHappiness(8);
				this.showMessage(randomMessage);
			},
			
			// 讲笑话按钮
			makeJoke() {
				const jokes = [
					'小圆，你知道为什么我每天都很开心吗？因为我的生活里有你这个开心果！',
					'小圆，昨天我梦见你变成了一个冰淇淋，我刚要吃，你突然开口说："要慢慢吃哦，不然会化掉的~"',
					'小圆，你知道什么动物最会哄人开心吗？是小猫咪，就像你一样可爱又粘人！',
					'小圆，我昨天学会了一个新成语，叫"圆圆满满"，用来形容有你的生活最合适了！',
					'小圆，你知道为什么月亮有时候圆有时候弯吗？因为它也在模仿你的笑脸呀！',
					'小圆，我刚才看到一个镜子，里面有个超级可爱的人，你猜是谁？哈哈，是你呀！',
					'小圆，今天有人问我喜欢什么形状，我毫不犹豫地说："圆形，因为它让我想起了你！"',
					'小圆，你知道为什么我总是迷路吗？因为你的笑容让我迷失了方向~',
					'小圆，昨天我数星星，数着数着突然发现，最亮的那颗星星好像你的眼睛！',
					'小圆，你知道我最喜欢什么季节吗？是你在的季节，因为每天都像春天一样温暖！',
					'小圆，我刚才做了个测试，结果显示我最喜欢的人是你，你看，连测试都知道！',
					'小圆，你知道为什么我总是饿吗？因为你的笑容让我胃口大开！',
					'小圆，昨天我在沙滩上写了你的名字，结果海浪都来帮忙，把你的名字冲得更大了！',
					'小圆，你知道我为什么喜欢拍照吗？因为我想把你的每一个笑容都记录下来！',
					'小圆，今天我问风，怎样才能让你开心，风说："只要你在她身边就够了。"',
					'小圆，你知道我最喜欢听什么声音吗？是你笑起来的声音，比任何音乐都好听！',
					'小圆，昨天我画了一幅画，画的是我们的未来，里面充满了幸福和欢笑~',
					'小圆，你知道为什么我总是早起吗？因为我想早点看到你的笑容！',
					'小圆，我刚才看到一朵特别漂亮的花，它说它叫"小圆花"，因为和你一样美丽！',
					'小圆，你知道我为什么喜欢下雨天吗？因为我们可以一起撑伞，靠得更近~',
					'小圆，昨天我做了个梦，梦见你变成了天使，结果你说："我本来就是你的天使呀！"',
					'小圆，你知道为什么我喜欢吃甜的吗？因为你的笑容比糖还甜！',
					'小圆，今天我学会了一个新魔法，就是让你开心的魔法，你想试试吗？',
					'小圆，你知道我为什么喜欢看书吗？因为每一页都让我想起你！',
					'小圆，昨天我对着镜子练习微笑，结果镜子里的我突然说："你笑起来好像小圆！"'
				];
				const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
				this.increaseHappiness(4);
				this.showMessage(randomJoke);
			},
			
			// 夸奖按钮
			compliment() {
				const compliments = [
					'小圆今天的笑容比阳光还要灿烂！',
					'小圆穿什么都好看，真是天生的衣架子！',
					'小圆的眼睛真漂亮，就像会说话一样~',
					'小圆的声音真好听，听你说话就是一种享受！',
					'小圆真的很温柔，每次和你在一起都感觉很安心~',
					'小圆做的饭真的太好吃了，我可以吃一辈子！',
					'小圆真聪明，什么问题都难不倒你！',
					'小圆的手真巧，做什么都那么精致！',
					'小圆的性格真好，和你相处真的很舒服！',
					'小圆笑起来的时候，整个世界都明亮了~',
					'小圆真的很善良，总是为别人着想！',
					'小圆的品味真好，选什么都那么有眼光！',
					'小圆真的很勇敢，面对困难从不退缩！',
					'小圆的皮肤真好，就像婴儿一样光滑！',
					'小圆真的很细心，总是能注意到别人忽略的细节！',
					'小圆的发型真好看，很适合你！',
					'小圆真的很有耐心，从来不会随便生气！',
					'小圆的身材真好，穿什么都好看！',
					'小圆真的很有才华，什么都会！',
					'小圆的名字真好听，和你的人一样可爱！',
					'小圆真的很有气质，走到哪里都是焦点！',
					'小圆的眼睛里有星星，一眨一眨的真可爱！',
					'小圆真的很独立，什么事情都能自己做好！',
					'小圆笑起来有小酒窝，真的太可爱了！',
					'小圆真的很有爱心，对小动物都那么温柔！',
					'小圆的笑容是我每天最大的动力！',
					'小圆真的很特别，和别人都不一样！',
					'小圆的怀抱真温暖，让人不想离开！',
					'小圆真的很会照顾人，和你在一起很幸福！',
					'小圆的声音真治愈，听你说话烦恼都没了！'
				];
				const randomCompliment = compliments[Math.floor(Math.random() * compliments.length)];
				this.increaseHappiness(6);
				this.showMessage(randomCompliment);
			},
			
			// 拥抱按钮
			hug() {
				this.increaseHappiness(10);
				const hugMessages = [
					'(给小圆一个温暖的拥抱)你知道吗？你的拥抱是我一天中最期待的事情~',
					'(紧紧抱着小圆)有你在怀里，感觉整个世界都安静了~',
					'(轻轻抱着小圆)你的体温让我感觉好温暖~',
					'(温柔地拥抱小圆)好想就这样一直抱着你不放手~',
					'(给小圆一个熊抱)你知道吗？你的拥抱有治愈一切的力量~',
					'(抱着小圆转圈)和你拥抱的感觉真的太好了！',
					'(轻轻拍着小圆的背)别怕，有我在呢~',
					'(把头埋在小圆的头发里)你身上的味道真好闻~',
					'(紧紧抱着小圆)今天过得好吗？不管怎样，我都在这里~',
					'(给小圆一个暖暖的拥抱)有你在身边，真好~',
					'(抱着小圆不放)我好像有点贪心，不想松开你~',
					'(温柔地拥抱小圆)今天辛苦了，让我抱抱你~',
					'(给小圆一个大大的拥抱)看到你就忍不住想抱抱你~',
					'(抱着小圆轻摇)你知道吗？你的拥抱是最好的安慰~',
					'(紧紧抱着小圆)谢谢你一直在我身边~',
					'(给小圆一个甜甜的拥抱)今天有没有想我呀？',
					'(抱着小圆不放)我觉得我可能抱不够了~',
					'(温柔地拥抱小圆)你是我的避风港~',
					'(给小圆一个充满爱的拥抱)我爱你~',
					'(抱着小圆转圈)和你在一起的每一刻都很开心~',
					'(轻轻抱着小圆)今天的你特别可爱~',
					'(紧紧抱着小圆)有你真好~',
					'(给小圆一个安慰的拥抱)不管发生什么，我都会陪着你~',
					'(抱着小圆不放手)我好像上瘾了，你的拥抱太舒服了~',
					'(温柔地拥抱小圆)你知道吗？你是我最重要的人~'
				];
				const randomMessage = hugMessages[Math.floor(Math.random() * hugMessages.length)];
				this.showMessage(randomMessage);
				this.createHeartParticles(); // 拥抱时显示爱心粒子
			},
			
			// 击掌按钮
			highFive() {
				this.increaseHappiness(7);
				const highFiveMessages = [
					'(和小圆击掌)小圆真厉害！',
					'(开心地和小圆击掌)太棒了！我们配合得真默契~',
					'(和小圆击掌)小圆今天表现超棒！',
					'(用力击掌)小圆真的太厉害了，我崇拜你！',
					'(轻轻击掌)小圆真聪明，这么快就学会了~',
					'(和小圆击掌)耶！我们成功了！',
					'(击掌三次)小圆三连击，超厉害！',
					'(和小圆击掌)小圆的手真软~',
					'(开心击掌)小圆好样的！',
					'(和小圆击掌)今天的小圆特别棒！',
					'(击掌)小圆真的很努力呢！',
					'(和小圆击掌)小圆的进步真快！',
					'(击掌)小圆最棒了！',
					'(和小圆击掌)我们真是最佳拍档！',
					'(击掌)小圆好聪明！',
					'(和小圆击掌)今天又学到了新技能，小圆太厉害了！',
					'(击掌)小圆的反应真快！',
					'(和小圆击掌)小圆真的很有天赋！',
					'(击掌)小圆的点子真多！',
					'(和小圆击掌)和你在一起做什么都很开心！',
					'(击掌)小圆的观察力真强！',
					'(和小圆击掌)小圆的记忆力真好！',
					'(击掌)小圆的想象力真丰富！',
					'(和小圆击掌)小圆的品味真好！',
					'(击掌)小圆的笑容最治愈了！'
				];
				const randomMessage = highFiveMessages[Math.floor(Math.random() * highFiveMessages.length)];
				this.showMessage(randomMessage);
			},
			
			// 惹小圆生气按钮
			annoyXiaoyuan() {
				// 按下后开心指数不会降低
				const annoyedMessages = [
					'嘿小圆，你今天的头发有点乱哦~',
					'小圆，昨天你做的饭好像有点咸...',
					'小圆，我忘记带你喜欢的零食了！',
					'小圆，你走路的样子好像小鸭子，哈哈~',
					'小圆，你刚才说错话了！',
					'小圆，你好像又胖了一点...',
					'小圆，你的衣服好像穿反了！',
					'小圆，我把你的化妆品弄倒了...',
					'小圆，我忘记今天是什么日子了...',
					'小圆，你生气的样子也很可爱！',
					'小圆，你今天话有点多哦~',
					'小圆，你选的电影真的不好看...',
					'小圆，我刚才看到比你更可爱的女生了！',
					'小圆，你的手机壁纸为什么不是我？',
					'小圆，你今天的妆好像化得有点浓...',
					'小圆，你刚才唱歌跑调了！',
					'小圆，你选的餐厅真的好贵...',
					'小圆，我刚才偷偷吃了你最后一块巧克力...',
					'小圆，你刚才自拍的时候表情好僵...',
					'小圆，你今天的香水味好像太浓了...',
					'小圆，你居然不记得我上次送你的礼物是什么！',
					'小圆，你打字的速度真慢！',
					'小圆，你刚才讲的笑话一点都不好笑...',
					'小圆，你居然不喜欢吃我最喜欢的零食！',
					'小圆，你今天穿的衣服好像上次穿过了...',
					'小圆，你刚才走路差点摔倒，哈哈！',
					'小圆，你居然不记得我们第一次见面的地方！',
					'小圆，你整理的房间还是有点乱...',
					'小圆，你刚才看帅哥的眼神我都看到了！',
					'小圆，你居然觉得我最好的朋友比我帅！'
				];
				const randomMessage = annoyedMessages[Math.floor(Math.random() * annoyedMessages.length)];
				this.showMessage(randomMessage);
				// 添加一些视觉效果，但不降低开心指数
				this.isAngryAnimation = true;
				setTimeout(() => {
					this.isAngryAnimation = false;
				}, 1000);
			}
		}
	}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40rpx 30rpx;
  background-color: #fff0f3;
  min-height: 1200rpx;
  position: relative;
  overflow: hidden;
  font-family: 'PingFang SC', 'Helvetica Neue', Arial, sans-serif;
}

/* 背景装饰泡泡动画 */
.bg-decoration {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
  overflow: hidden;
}

.bg-bubble {
  position: absolute;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.15);
  animation: floatBubble 8s ease-in-out infinite;
}

.bubble-1 {
  width: 120rpx;
  height: 120rpx;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.bubble-2 {
  width: 80rpx;
  height: 80rpx;
  top: 70%;
  left: 5%;
  animation-delay: 1s;
}

.bubble-3 {
  width: 150rpx;
  height: 150rpx;
  top: 20%;
  right: 5%;
  opacity: 0.7;
  animation-delay: 2s;
}

.bubble-4 {
  width: 100rpx;
  height: 100rpx;
  top: 60%;
  right: 10%;
  opacity: 0.5;
  animation-delay: 3s;
}

.bubble-5 {
  width: 60rpx;
  height: 60rpx;
  top: 85%;
  right: 20%;
  opacity: 0.3;
  animation-delay: 4s;
}

@keyframes floatBubble {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-20rpx) scale(1.05);
  }
}

.header {
  margin: 20rpx 0 40rpx;
  text-align: center;
  z-index: 1;
  padding: 0 20rpx;
  animation: slideDown 0.8s ease-out;
}

.header-title {
  font-size: 52rpx;
  font-weight: 700;
  color: #E63966;
  display: block;
  margin-bottom: 16rpx;
  text-shadow: 0 4rpx 8rpx rgba(230, 57, 102, 0.2);
  animation: titlePulse 3s ease-in-out infinite;
}

.header-subtitle {
  font-size: 30rpx;
  color: #FF85A2;
  font-weight: 400;
  opacity: 0.9;
  animation: subtitleFade 2s ease-in-out infinite alternate;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-50rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes titlePulse {
  0%, 100% {
    transform: scale(1);
    text-shadow: 0 4rpx 8rpx rgba(230, 57, 102, 0.2);
  }
  50% {
    transform: scale(1.02);
    text-shadow: 0 6rpx 12rpx rgba(230, 57, 102, 0.3);
  }
}

@keyframes subtitleFade {
  from {
    opacity: 0.7;
    transform: translateY(0);
  }
  to {
    opacity: 1;
    transform: translateY(-5rpx);
  }
}

.character-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30rpx 0 50rpx;
  z-index: 1;
  position: relative;
  width: 100%;
  animation: fadeInUp 1s ease-out 0.3s both;
}

.character-frame {
  position: relative;
  padding: 0;
  background-color: #FFFFFF;
  border-radius: 48rpx;
  box-shadow: 0 12rpx 30rpx rgba(230, 57, 102, 0.12);
  margin-bottom: 35rpx;
  border: 2rpx solid #FFF0F5;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 0;
  padding-bottom: 80%;
  margin-left: auto;
  margin-right: auto;
  animation: frameGlow 4s ease-in-out infinite;
}

@keyframes frameGlow {
  0%, 100% {
    box-shadow: 0 12rpx 30rpx rgba(230, 57, 102, 0.12);
  }
  50% {
    box-shadow: 0 12rpx 40rpx rgba(230, 57, 102, 0.2);
  }
}

.character-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 48rpx;
  background-color: #F8F8F8;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  animation: imageEntrance 1s ease-out 0.5s both;
}

/* 不同心情状态的特殊动画 */
.character-img.happy {
  border: 3rpx solid #FF85A2;
  box-shadow: 0 0 20rpx rgba(255, 133, 162, 0.25);
  animation: happyBounce 2s ease-in-out infinite;
}

.character-img.angry {
  border: 3rpx solid #FF6B6B;
  box-shadow: 0 0 20rpx rgba(255, 107, 107, 0.25);
  animation: angryShake 0.5s ease-in-out;
}

.character-img.excited {
  border: 3rpx solid #FFD93D;
  box-shadow: 0 0 20rpx rgba(255, 217, 61, 0.25);
  animation: excitedJump 1s ease-in-out infinite;
}

.character-img.neutral {
  border: 3rpx solid #E0E0E0;
  box-shadow: 0 0 20rpx rgba(224, 224, 224, 0.25);
  animation: gentleBreath 3s ease-in-out infinite;
}

@keyframes imageEntrance {
  from {
    opacity: 0;
    transform: scale(0.8) rotate(-5deg);
  }
  to {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}

@keyframes happyBounce {
  0%, 100% {
    transform: scale(1) translateY(0);
  }
  25% {
    transform: scale(1.02) translateY(-5rpx);
  }
  50% {
    transform: scale(1.05) translateY(-8rpx);
  }
  75% {
    transform: scale(1.02) translateY(-5rpx);
  }
}

@keyframes angryShake {
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-8rpx);
  }
  50% {
    transform: translateX(8rpx);
  }
  75% {
    transform: translateX(-8rpx);
  }
}

@keyframes excitedJump {
  0%, 100% {
    transform: scale(1) translateY(0);
  }
  50% {
    transform: scale(1.1) translateY(-15rpx);
  }
}

@keyframes gentleBreath {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
}

/* 心情指示器动画 */
.mood-indicator {
  position: absolute;
  top: -20rpx;
  right: -20rpx;
  font-size: 64rpx;
  background-color: #FFFFFF;
  border-radius: 50%;
  width: 120rpx;
  height: 120rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6rpx 20rpx rgba(0, 0, 0, 0.12);
  border: 2rpx solid #FFF0F5;
  z-index: 2;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  animation: moodPop 0.6s ease-out 1s both, moodFloat 3s ease-in-out infinite 2s;
}

@keyframes moodPop {
  from {
    opacity: 0;
    transform: scale(0) rotate(-180deg);
  }
  to {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}

@keyframes moodFloat {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-10rpx) rotate(5deg);
  }
  75% {
    transform: translateY(-5rpx) rotate(-5deg);
  }
}

.character-text {
  margin-top: 25rpx;
  font-size: 38rpx;
  color: #E63966;
  text-align: center;
  font-weight: 700;
  padding: 0 40rpx;
  line-height: 1.5;
  animation: textSlide 1s ease-out 0.8s both;
}

@keyframes textSlide {
  from {
    opacity: 0;
    transform: translateX(-50rpx);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* 按钮区域动画 */
.button-area {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20rpx auto 40rpx;
  z-index: 1;
  box-sizing: border-box;
  padding: 0 20rpx;
  animation: fadeInUp 1s ease-out 1.2s both;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(50rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.button-column {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 650rpx;
  margin: 0 auto;
  z-index: 1;
}

.button-column > .interaction-btn {
  margin-bottom: 25rpx;
  animation: buttonStagger 0.6s ease-out both;
}

/* 按钮交错入场动画 */
.button-column > .interaction-btn:nth-child(1) { animation-delay: 1.3s; }
.button-column > .interaction-btn:nth-child(2) { animation-delay: 1.4s; }
.button-column > .interaction-btn:nth-child(3) { animation-delay: 1.5s; }
.button-column > .interaction-btn:nth-child(4) { animation-delay: 1.6s; }
.button-column > .interaction-btn:nth-child(5) { animation-delay: 1.7s; }
.button-column > .interaction-btn:nth-child(6) { animation-delay: 1.8s; }
.button-column > .interaction-btn:nth-child(7) { animation-delay: 1.9s; }

@keyframes buttonStagger {
  from {
    opacity: 0;
    transform: translateX(-100rpx) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

.interaction-btn {
  width: 100%;
  height: 120rpx;
  border-radius: 30rpx;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.15);
  position: relative;
  text-align: center;
  box-sizing: border-box;
  font-weight: 700;
  padding: 0;
  margin: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  cursor: pointer;
}

.interaction-btn:hover {
  transform: translateY(-4rpx) scale(1.02);
  box-shadow: 0 12rpx 25rpx rgba(0, 0, 0, 0.2);
}

.interaction-btn:active {
  transform: translateY(2rpx) scale(0.98);
  box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.15);
  transition: all 0.1s ease;
}

.interaction-btn .btn-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 2;
  gap: 20rpx;
}

.btn-effect {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  z-index: 1;
}

/* 按钮渐变背景和动画 */
.btn-apology {
  background: linear-gradient(135deg, #FF7EB3, #FF6B9C);
}

.btn-gift {
  background: linear-gradient(135deg, #7BCEFA, #5BB8FF);
}

.btn-joke {
  background: linear-gradient(135deg, #D4A5FF, #C28CFF);
}

.btn-compliment {
  background: linear-gradient(135deg, #FFD166, #FFC145);
}

.btn-hug {
  background: linear-gradient(135deg, #83E8BA, #6BD4A8);
}

.btn-highfive {
  background: linear-gradient(135deg, #FFA94D, #FF9500);
}

.btn-annoy {
  background: linear-gradient(135deg, #FF4A4A, #FF2D2D);
}

/* 按钮悬停光效 */
.interaction-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.6s ease;
  z-index: 1;
}

.interaction-btn:hover::before {
  left: 100%;
}

.btn-icon {
  font-size: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60rpx;
  height: 60rpx;
  text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.2);
  filter: drop-shadow(0 2rpx 4rpx rgba(0, 0, 0, 0.2));
  transition: all 0.3s ease;
}

.interaction-btn:hover .btn-icon {
  transform: scale(1.2) rotate(10deg);
}

.btn-text {
  font-size: 34rpx;
  font-weight: 700;
  text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.2);
  letter-spacing: 0.5rpx;
  transition: all 0.3s ease;
}

.interaction-btn:hover .btn-text {
  transform: scale(1.05);
  letter-spacing: 1rpx;
}

/* 状态区域动画 */
.status-area {
  width: 100%;
  max-width: 650rpx;
  margin: 30rpx 0 40rpx;
  background-color: #FFFFFF;
  padding: 35rpx 40rpx;
  border-radius: 30rpx;
  box-shadow: 0 12rpx 30rpx rgba(230, 57, 102, 0.12);
  z-index: 1;
  border: 1rpx solid #F0F0F0;
  box-sizing: border-box;
  animation: scaleIn 0.8s ease-out 1.5s both;
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.status-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.status-text {
  font-size: 34rpx;
  color: #E63966;
  font-weight: 700;
}

.status-level {
  font-size: 34rpx;
  color: #FF6B9C;
  font-weight: 700;
  animation: numberPulse 2s ease-in-out infinite;
}

@keyframes numberPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.progress-bar {
  height: 36rpx;
  background-color: #F0F0F0;
  border-radius: 18rpx;
  overflow: hidden;
  position: relative;
  border: 1rpx solid #FFFFFF;
}

.progress-fill {
  height: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 18rpx;
  width: 0%;
  transition: width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  animation: progressGlow 2s ease-in-out infinite;
}

@keyframes progressGlow {
  0%, 100% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.2);
  }
}

.progress-sparkle {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
  animation: sparkle 2s infinite;
}

@keyframes sparkle {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

/* 消息框增强动画 */
.message-box {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #333333;
  color: white;
  padding: 35rpx 40rpx;
  border-radius: 30rpx;
  z-index: 999;
  max-width: 600rpx;
  width: 80%;
  text-align: center;
  box-shadow: 0 20rpx 50rpx rgba(0, 0, 0, 0.4);
  border: 1rpx solid #666666;
  animation: messagePop 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) both;
}

.message-box.happy-message {
  background-color: #E91E63;
  box-shadow: 0 20rpx 50rpx rgba(233, 30, 99, 0.4);
  animation: happyMessagePop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) both;
}

@keyframes messagePop {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.5) rotate(-10deg);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1) rotate(0deg);
  }
}

@keyframes happyMessagePop {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.3);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

.message-text {
  font-size: 34rpx;
  line-height: 1.5;
  font-weight: 700;
  animation: textShine 2s ease-in-out infinite;
}

@keyframes textShine {
  0%, 100% {
    text-shadow: 0 0 10rpx rgba(255, 255, 255, 0.5);
  }
  50% {
    text-shadow: 0 0 20rpx rgba(255, 255, 255, 0.8), 0 0 30rpx rgba(255, 255, 255, 0.6);
  }
}

/* 爱心粒子容器 */
.hearts-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 10;
}

/* 爱心样式和动画 */
.heart {
  position: absolute;
  width: 50rpx;
  height: 50rpx;
  background-color: #FF6B81;
  border-radius: 50%;
  box-shadow: 0 4rpx 12rpx rgba(255, 107, 129, 0.4);
  animation: heartFloat 2s ease-in-out forwards, heartPulse 1s ease-in-out infinite;
}

@keyframes heartFloat {
  0% {
    transform: translateY(0) scale(0.5) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(-150rpx) scale(1) rotate(360deg);
    opacity: 0;
  }
}

@keyframes heartPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

/* 底部装饰动画 */
.footer {
  margin-top: 40rpx;
  text-align: center;
  z-index: 1;
  padding: 0 20rpx;
  animation: fadeIn 1s ease-out 2s both;
}

.footer-text {
  font-size: 28rpx;
  color: #FF85A2;
  font-weight: 400;
  opacity: 0.8;
  text-align: center;
  margin-top: 20rpx;
  animation: footerWave 4s ease-in-out infinite;
}

@keyframes footerWave {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10rpx);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* 响应式调整 */
@media (max-width: 750rpx) {
  .character-frame {
    width: 90%;
    padding-bottom: 90%;
  }
  
  .button-column {
    max-width: 90%;
  }
  
  .status-area {
    max-width: 90%;
  }
  
  .btn-content {
    gap: 15rpx;
  }
  
  .btn-icon {
    font-size: 42rpx;
    width: 50rpx;
    height: 50rpx;
  }
  
  .btn-text {
    font-size: 30rpx;
  }
}

/* 小屏幕优化 */
@media (max-width: 400rpx) {
  .btn-content {
    flex-direction: column;
    gap: 8rpx;
  }
  
  .btn-icon {
    font-size: 36rpx;
    width: 40rpx;
    height: 40rpx;
  }
  
  .btn-text {
    font-size: 28rpx;
  }
}
</style>