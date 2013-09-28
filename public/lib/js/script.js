﻿
var $body = $('body'),
	$frame = $body.find('#frame'),
	env = ['development', 'production'][0],
	hashPage = location.hash || '#/welcome';

// 绑定链接
$body.delegate('[href]', 'click', function(event) {
	event.preventDefault();
	loadFrame($(this).attr('href'));
}).delegate('[data-toggle="page"]', 'click', function() {
    $('[data-toggle="page"]').parent('li').removeClass('active');
    $(this).parent('li').addClass('active');
}).delegate('form [type="submit"]', 'click', function() {
    $(this).closest('form').submit();
});

// 加载默认子页
loadFrame(hashPage);

// 开发模式下 禁用缓存
if (env === 'development') {
	$.ajaxSetup({
		cache: false
	});
}

// hash改变时自动加载子页面
$(window).on('hashchange', function(event) {
	event.preventDefault();
	var hash = location.hash;
	if (hash && hash !== '#' && hash !== hashPage) {
		loadFrame(hash);
	}
});

// 加载子页面
function loadFrame(hash, success) {
	$.get(hash.substr(1) + '.html', function(resTxt) {
		location.hash = hashPage = hash;	// 顺序: hashPage > location.hash
		$frame.html(resTxt);
		success && success();
	});
}
function reloadFrame(success) {
	var hash = location.hash;
	$.get(hash.substr(1) + '.html', function(resTxt) {
		$frame.html(resTxt);
		success && success();
	});
}
