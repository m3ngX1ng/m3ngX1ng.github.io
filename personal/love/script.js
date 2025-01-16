let currentIndex = 0;
 
function showSlide(index) {
    const images = document.querySelector('.carousel-images');
    const totalSlides = images.children.length;
 
    if (index >= totalSlides) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalSlides - 1;
    } else {
        currentIndex = index;
    }
 
    const offset = -currentIndex * 100 + '%';
    images.style.transform = `translateX(${offset})`;
}
 
function nextSlide() {
    showSlide(currentIndex + 1);
}
 
function prevSlide() {
    showSlide(currentIndex - 1);
}
 
// 自动播放功能（可选）
setInterval(nextSlide, 3000); // 每3秒切换一次图片
 
// 初始化显示第一张图片
window.onload = () => {
    showSlide(currentIndex);
};