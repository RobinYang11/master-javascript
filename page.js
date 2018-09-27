function page(root, callback) {

				var _this = this;
				this.callback = callback;
				this.dom = document.querySelector(root);
				this.currentPage = 1;
				this.pageSize = 10;
				this.total = 404;
				this.showPage = 10;
				this.firstCp = true;

				//上一頁
				this.pre = function() {
					if(_this.currentPage > 0) {
						_this.currentPage--
							_this.cp(_this.currentPage)
					}
				};
				//跳到某一页功能
				this.go = function() {
					var page = parseInt(document.querySelector('.go>input').value);
					if(page) {
						console.log(page)
						_this.currentPage = page
						_this.cp(_this.currentPage)
					}
				}
				//下一页
				this.next = function(e) {
					console.log(_this.currentPage)
					if(_this.currentPage < _this.total / _this.pageSize) {
						_this.currentPage++;
						_this.cp(_this.currentPage);
						//						_this.changePage(_this.currentPage)
					} else {
						console.log(_this.currentPage)
					}

				};

				//点击某一页
				this.pages = function(e) {
					var index = e.target.getAttribute('data-index');
					_this.cp(index)
				}

				this.initPage = function(b, e) {
					var li = document.querySelectorAll(root + '>.wp>a')
					var lis = Array.prototype.slice.call(li);
					for(var i = 1; i < _this.showPage+1; i++) {
						lis[i].innerHTML = b
						lis[i].setAttribute("data-index", b)
						b++;
					}
				}

				this.cp = function(index) {
					console.log(index)
					var bt = _this.compouteBetween(index);
					_this.initPage(bt.begin, bt.end);
					_this.active(index);
					if(_this.callback) {
						_this.callback(_this.currentPage, _this.pageSize);
					}

				}

				this.compouteBetween = function(index) {
					var begin = 1,
						activeIndex = index,
						end = _this.showPage,
						totalPage = (this.total % this.pageSize === 0) ? (this.total / this.pageSize) :
						(parseInt(this.total / this.pageSize) + 1);

					if(index > 5) {
						begin = index - 5;
						end = index + 4;
						if(end > totalPage) {
							end = totalPage;
						}
						activeIndex = 6
					}
					if(totalPage - index < 5) {
						end = totalPage;
						begin = end - 9;
					}

					return {
						"begin": begin,
						"end": end
					}
				}

				this.active = function(index) {
					var lis = document.querySelectorAll(root + ">.wp>a");
					var l = Array.prototype.slice.call(lis);
					l.forEach(function(i) {
						if(i.classList.contains('active')) {
							i.classList.remove('active')
						}
						if(parseInt(i.getAttribute('data-index')) == index) {
							i.classList.add('active')
						}
					});
				}

				this.bindEvent = function() {
					var next = document.querySelector(".next");
					var pre = document.querySelector('.pre');
					var go = document.querySelector('.go');
					go.addEventListener('click', this.go)
//					next.addEventListener('click', this.next);
//					pre.addEventListener('click', this.pre);

					//把li标签的单击事件代理到ul对象上
					var ul = document.querySelector(root + '>.wp');
					ul.addEventListener('click', function(e) {
						//先判断是否是li标签
						if(e.target.tagName == "A") {
							//如果是 再判断是否是next,pre,lastpage
							if(e.target.classList.contains('pre')) {
								_this.pre();
							} else if(e.target.classList.contains('next')) {
								_this.next();
							} else if(e.target.classList.contains('last')) {
								_this.last();
							} else {
								_this.pages(e);
							}
						}
					})
				}

				this.initialize = function() {
					var ul = document.querySelector(".pagenation>.wp");
					for(var i = -1; i <= _this.showPage; i++) {
						var a = document.createElement('A');
						a.href = "#"
						if(i == -1) {
							a.classList.add('pre')
							a.innerHTML = "pre"
						} else if(i == _this.showPage) {
							a.innerHTML = "next"
							a.classList.add('next')
						} else {
							a.innerHTML = i + 1;
							a.setAttribute("data-index", i + 1);
						}

						ul.appendChild(a);
					}
				}

				this.init = function() {
					//负责页面的元素的创建
					_this.initialize();

					//跳转到当前页
					_this.cp(_this.currentPage)

					//负责绑定事件
					_this.bindEvent();
					//
				}
				this.init();

			}
