const trapFocus = (e) => {
  
  const TAB_KEY_CODE = 9;
  const navigationAnchors = document.getElementsByClassName("navigation-anchor--mobile");
  const isTabPressed = e.key === "Tab" || e.keyCode === TAB_KEY_CODE;
  if(!isTabPressed){
    return;
  }

  const firstFocusableElement = navigationAnchors[0];
  const lastFocusableElement = navigationAnchors[navigationAnchors.length - 1];
  
  const activeElement = document.activeElement;
  // handle tab + shift (navigation backwards)
  if( e.shifKey ){
    if(activeElement === firstFocusableElement){
      lastFocusableElement.focus();
      e.preventDefault();
    }
  } else {
    if(activeElement === lastFocusableElement){
      firstFocusableElement.focus();
      e.preventDefault();
    }
    
  }
}

const setTabindex = tabindex => element => element.setAttribute("tabindex",tabindex);
const enableFocus = element => setTabindex(0)(element);
const disableFocus = element => setTabindex(-1)(element);

window.addEventListener("DOMContentLoaded",()=>{
  let isMenuOpen = false;
  const menuButton = document.getElementById("js-menu-button");
  const navigation = document.getElementById("js-navigation");
  const navigationAnchors = document.getElementsByClassName("navigation-anchor--mobile");
  
  menuButton.addEventListener("click",()=>{
    
    isMenuOpen = !isMenuOpen;

    if(isMenuOpen){
      Array.from(navigationAnchors).forEach(enableFocus);
      document.addEventListener("keydown", trapFocus);
    }
    else{
      Array.from(navigationAnchors).forEach(disableFocus);
    } 
    navigation.classList.toggle("mobile-navigation--active");
    menuButton.classList.toggle("hamburger-menu--open");

    document.querySelector("body").classList.toggle("no-vertical-overflow");
  })
})