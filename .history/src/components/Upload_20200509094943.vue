<template>
	<div class="upload-box text-center" :class="{'uploaded':src}">
		<div class="plus">
			<i class="el-icon-plus"></i>
			<input class="file" @change="handleUpload" type="file">
		</div>
		<img :src="src" alt="">
		<div class="cover">
			<i class="el-icon-delete" @click="handleRemove"></i>
		</div>
	</div>
</template>

<script>
import axios from '@/plugins/axios'
	export default {
		name:"Upload",
		// 组件外部数据
		props: ['action', 'headers', 'data', 'removeAction', 'src','defaultAvatar'],
		// 组件内部数据
		data() {
			return {

			}
		},
		methods: {
			// 删除图片
			handleRemove() {
				let src = this.src.replace('http://localhost:3003', '.');
				// 判断是否默认头像，如果是默认头像，直接清空，后台不做物理删除
				if(this.src == this.defaultAvatar){
					this.$emit('update:src','');
					return;
				}
				// 发送ajax
				var ajax = new XMLHttpRequest();
				ajax.open("DELETE", this.removeAction, true);
				// 设置header,ES5语法
				let obj = { ...this.headers };
				for (let key in obj) {
					ajax.setRequestHeader(key, obj[key]);
				}
				ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
				ajax.send(`src=${src}`);
				ajax.onreadystatechange = () => {
					if (ajax.readyState == 4) {
						let { status, msg, data } = JSON.parse(ajax.responseText);
						if (status) {
							this.$emit('update:src', '');
						}
					}
				}
			},
			// 上传文件
			async handleUpload(e) {
				// 获取file对象
				let file = e.target.files[0];
				// 生成formData
				var formData = new FormData();
				formData.append("file", file);
				// 追加附带的额外参数,ES6语法
				// Object.keys(this.data).forEach((key) => {
				// 	formData.append(key, this.data[key])
				// });
				let {status,mdImg,lgImg} = await axios.post(this.action,formData)
				// 发送ajax
				// var ajax = new XMLHttpRequest();
				// ajax.open("POST", this.action, true);
				// // 设置header,ES5语法
				// let obj = { ...this.headers };
				// for (let key in obj) {
				// 	ajax.setRequestHeader(key, obj[key]);
				// }
				// ajax.send(formData);
				// ajax.onreadystatechange = () => {
				// 	if (ajax.readyState == 4) {
				// 		let { status, msg, data } = JSON.parse(ajax.responseText);
						if (status) {
							// 上传成功
							this.$emit('update:src', mdImg);
							// 清空file表单value
							this.$refs.file.value="";
						}
				// 	}
			}
		}
	}
</script>

<style scoped lang="less">
	/* upload组件 */
	.text-center {
		text-align: center;
	}

	.upload-box {
		width: 150px;
		height: 150px;
		line-height: 150px;
		border: 1px solid #eeeeee;
		border-radius: 4px;
		overflow: hidden;
		position: relative;

	}

	.upload-box .el-icon-plus {
		font-size: 24px;
	}

	.upload-box .file {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
		opacity: 0;
		cursor: pointer;
	}

	.upload-box .cover {
		content: "";
		display: block;
		font-size: 14px;
		color: white;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 2;
		background-color: rgba(0, 0, 0, 0.7);
		display: none;
	}

	.uploaded:hover .cover {
		display: block;
	}

	.upload-box img {
		width: 100%;
	}

	.uploaded .plus {
		display: none;
	}
</style>
