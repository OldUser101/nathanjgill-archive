var sidebarStatus = 0;
var mobileMode = 0;

function updateSidebar()
{
	const title = document.getElementById('ContentsTitle');
	const sidebar = document.getElementById('sidebar');
	const sidebarContent = document.querySelectorAll('.collapsible');
		
	if (window.innerWidth <= 700) {
		title.textContent = "☰ Contents";
		mobileMode = 1;
		if (sidebarStatus) {
			sidebarContent.forEach(item => item.style.display = 'block');
			sidebar.classList.remove('hidden');
			sidebar.classList.add('expanded');
		} else {
			sidebarContent.forEach(item => item.style.display = 'none');
			sidebar.classList.remove('expanded');
			sidebar.classList.add('hidden');
		}
	} else {
		mobileMode = 0;
		title.textContent = "Contents";
		sidebar.style.height = 'auto';
		sidebar.classList.remove('hidden');
		sidebar.classList.remove('expanded');
		sidebarContent.forEach(item => item.style.display = 'block');
	}
}

function adjustMainMargin() {
	const header = document.querySelector('#header');
	const headerContainer = document.querySelector('#header-container');
	const sidebar = document.querySelector('.sidebar');
    const main = document.querySelector('.main');
	const headerHeight = header.offsetHeight;
	sidebar.style.marginTop = `${headerHeight + 7}px`;
	var sidebarHeight = sidebar.offsetHeight;
	if (mobileMode == 0)
		sidebarHeight = 0;
	var totalHeight = headerHeight + sidebarHeight + 25;
	main.style.marginTop = `${totalHeight}px`;
	main.style.height = `calc(100vh - ${totalHeight}px)`;
	headerContainer.style.setProperty('--header-height', `${totalHeight - sidebarHeight}px`);
}

document.addEventListener('DOMContentLoaded', function() {
	updateSidebar();
	const sidebar = document.querySelector('#ContentsTitle');
	sidebar.addEventListener('click', function() {
		if (window.innerWidth <= 700) {
			if (sidebarStatus) {
				sidebarStatus = 0;
				updateSidebar();
				adjustMainMargin();
			} else {
				sidebarStatus = 1;
				updateSidebar();
				adjustMainMargin();
			}
		}
	});
	adjustMainMargin();
	window.addEventListener('resize', updateSidebar);
	window.addEventListener('resize', adjustMainMargin);
});