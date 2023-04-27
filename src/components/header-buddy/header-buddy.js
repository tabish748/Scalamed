
import Utils from '../../libs/utils.js';
class HeaderBuddy extends HTMLElement {
  static tname = "header-buddy";
    constructor() {
      super();
      Utils.Bind(this, "on");
    }
  
    
    connectedCallback() {
      this.Render();
      this.attachEventListeners(); // Attach the event listeners here
    }
    onMenuClick()
    {
      console.log('enteredd')
      nav_menu_container.classList.add('collapse');
    }
    handleOutsideClick(event) {
      if (!nav_menu_container.contains(event.target) && !hamburger_icon.contains(event.target)) {
        nav_menu_container.classList.remove('collapse');
      }
    }
     Render()
    {
     
      const html = `    
      <header class="header">
      <div class="container">
          <div class="header__wrapper">
              <i class="icon-scalamed-logo icon-2x"></i>
              <img src="../../assets/images/icons/hamburger.svg" class="header__wrapper__hamburger__icon" id="hamburger_icon"/>
              <div class="header__menu__container" id="nav_menu_container">
                  <ul>
                      <li><a href="/" data-link> Home </a></li>
                      <li><a href="/login" data-link> Contact </a></li>
                      <li><a href="/" data-link> Privacy & Terms </a></li>
                     
                  </ul>
              </div>
          </div>
      </div>
    </header>
`;

      const doc = Utils.toDocument(html);
      this.replaceChildren(doc);
      Utils.setIdShortcuts(this, this);
 
      hamburger_icon.addEventListener('click', () => this.onMenuClick())
    }
    attachEventListeners() 
    {
      if (this.hamburger_icon) 
        {
        this.hamburger_icon.addEventListener('click', () => this.onMenuClick());
        }
        document.addEventListener('click', (event) => this.handleOutsideClick(event));
    }

  }
  
  // Register the custom element
  Utils.Register_Element(HeaderBuddy);
  export default HeaderBuddy;
  