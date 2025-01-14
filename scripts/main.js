$(document).ready(function() {
	//sliders
    $('.slider').slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		prevArrow: $('.slider-prev'),
		nextArrow: $('.slider-next'),

	});

	//animation on scroll
	AOS.init({
		duration: 700,
	});
  

	//canvas rising line on a graph
	const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const basePoints = [
  { x: 0, y: 300 },
  { x: 70, y: 350 },
  { x: 150, y: 200 },
  { x: 250, y: 180 },
  { x: 290, y: 220 },
  { x: 390, y: 220 },
  { x: 420, y: 180 },
  { x: 510, y: 110 },
  { x: 550, y: 80 },
  { x: 610, y: 110 },
  { x: 700, y: 90 },
  { x: 810, y: 0 },
];

let points = [];
let progress = 0;

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;

  // Устанавливаем размеры канвы в физических пикселях
  canvas.width = canvas.offsetWidth * dpr;
  canvas.height = canvas.offsetHeight * dpr;

  ctx.scale(dpr, dpr); // Масштабируем контекст для чёткости

  scalePoints();
  drawGrid();
}

function scalePoints() {
  const widthRatio = canvas.width / canvas.offsetWidth;
  const heightRatio = canvas.height / canvas.offsetHeight;
  points = basePoints.map(point => ({
    x: point.x * (canvas.offsetWidth / 800),
    y: point.y * (canvas.offsetHeight / 400),
  }));
}

function animateLine() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawGrid();

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);

  const maxIndex = Math.floor(progress * (points.length - 1));
  for (let i = 0; i <= maxIndex; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }

  if (maxIndex < points.length - 1) {
    const nextPoint = points[maxIndex + 1];
    const prevPoint = points[maxIndex];
    const segmentProgress = (progress * (points.length - 1)) % 1;

    const currentX = prevPoint.x + (nextPoint.x - prevPoint.x) * segmentProgress;
    const currentY = prevPoint.y + (nextPoint.y - prevPoint.y) * segmentProgress;

    ctx.lineTo(currentX, currentY);
  }

  ctx.strokeStyle = '#73CCFF';
  ctx.lineWidth = 2;
  ctx.stroke();

  progress += 0.01;
  if (progress <= 1) {
    requestAnimationFrame(animateLine);
  }
}

function drawGrid() {
  ctx.beginPath();
  ctx.strokeStyle = '#00000018';
  ctx.lineWidth = 1;

  for (let x = 0; x <= canvas.width / window.devicePixelRatio; x += 100) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height / window.devicePixelRatio);
  }

  for (let y = 0; y <= canvas.height / window.devicePixelRatio; y += 100) {
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width / window.devicePixelRatio, y);
  }

  ctx.stroke();
}

window.addEventListener('resize', () => {
  resizeCanvas();
  if (progress === 0 || progress >= 1) {
    progress = 0;
    animateLine();
  }
});

window.addEventListener('scroll', function () {
  const sectionOffset = canvas.offsetTop;
  const sectionHeight = canvas.offsetHeight;
  const scrollTop = window.pageYOffset;
  const windowHeight = window.innerHeight;

  if (
    scrollTop + windowHeight >= sectionOffset &&
    scrollTop <= sectionOffset + sectionHeight
  ) {
    if (progress === 0 || progress >= 1) {
      progress = 0;
      animateLine();
    }
  }
});

// Инициализация
resizeCanvas();



	//timer
	let timer1, timer2;
	let timer1Value = 0;
	let timer2Value = 0;
			
	function startTimers() {

		clearInterval(timer1);
		clearInterval(timer2);
			  
		timer1Value = 0;
		timer2Value = 0;
			  
		timer1 = setInterval(function() {
			if (timer1Value < 120) {
				timer1Value++;
				$('#timer1').text(timer1Value);
			} else {
				clearInterval(timer1);
			}
			  }, 10);
			  
		timer2 = setInterval(function() {
			if (timer2Value < 10) {
				timer2Value++;
				$('#timer2').text(timer2Value);
			} else {
				clearInterval(timer2);
			}
			  }, 100);
			}
		
		$(window).on('scroll', function() {
			  const section = $('.timer'); 
			  const sectionOffset = section.offset().top; 
			  const sectionHeight = section.outerHeight(); 
			  const scrollTop = $(window).scrollTop(); 
			  const windowHeight = $(window).height(); 
		
			  if (scrollTop + windowHeight >= sectionOffset && scrollTop <= sectionOffset + sectionHeight) {
				startTimers();
			  }
		});
});