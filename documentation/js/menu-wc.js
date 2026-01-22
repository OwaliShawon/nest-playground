'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">practice-nest documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                                <li class="link">
                                    <a href="overview.html" data-type="chapter-link">
                                        <span class="icon ion-ios-keypad"></span>Overview
                                    </a>
                                </li>

                            <li class="link">
                                <a href="index.html" data-type="chapter-link">
                                    <span class="icon ion-ios-paper"></span>
                                        README
                                </a>
                            </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>

                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AlsModule.html" data-type="entity-link" >AlsModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-981a4af756f2445e5ccf5497c2ab13fe0518681567bfba0856cc02c6a1698ebbbaa6644a7c58825d783b81f2260e0aaf703005e0ff5bdf67682b2081d70965e4"' : 'data-bs-target="#xs-controllers-links-module-AppModule-981a4af756f2445e5ccf5497c2ab13fe0518681567bfba0856cc02c6a1698ebbbaa6644a7c58825d783b81f2260e0aaf703005e0ff5bdf67682b2081d70965e4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-981a4af756f2445e5ccf5497c2ab13fe0518681567bfba0856cc02c6a1698ebbbaa6644a7c58825d783b81f2260e0aaf703005e0ff5bdf67682b2081d70965e4"' :
                                            'id="xs-controllers-links-module-AppModule-981a4af756f2445e5ccf5497c2ab13fe0518681567bfba0856cc02c6a1698ebbbaa6644a7c58825d783b81f2260e0aaf703005e0ff5bdf67682b2081d70965e4"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-981a4af756f2445e5ccf5497c2ab13fe0518681567bfba0856cc02c6a1698ebbbaa6644a7c58825d783b81f2260e0aaf703005e0ff5bdf67682b2081d70965e4"' : 'data-bs-target="#xs-injectables-links-module-AppModule-981a4af756f2445e5ccf5497c2ab13fe0518681567bfba0856cc02c6a1698ebbbaa6644a7c58825d783b81f2260e0aaf703005e0ff5bdf67682b2081d70965e4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-981a4af756f2445e5ccf5497c2ab13fe0518681567bfba0856cc02c6a1698ebbbaa6644a7c58825d783b81f2260e0aaf703005e0ff5bdf67682b2081d70965e4"' :
                                        'id="xs-injectables-links-module-AppModule-981a4af756f2445e5ccf5497c2ab13fe0518681567bfba0856cc02c6a1698ebbbaa6644a7c58825d783b81f2260e0aaf703005e0ff5bdf67682b2081d70965e4"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-a60d0bf3cd80d7566f78e544b1b8790c8210c15a70ddfcb8fd0c9e6b88019ce070bebcbec154b54d9f8181e5e8b70c2dad1c27dfec6772d17967d7277f26a8a6"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-a60d0bf3cd80d7566f78e544b1b8790c8210c15a70ddfcb8fd0c9e6b88019ce070bebcbec154b54d9f8181e5e8b70c2dad1c27dfec6772d17967d7277f26a8a6"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-a60d0bf3cd80d7566f78e544b1b8790c8210c15a70ddfcb8fd0c9e6b88019ce070bebcbec154b54d9f8181e5e8b70c2dad1c27dfec6772d17967d7277f26a8a6"' :
                                            'id="xs-controllers-links-module-AuthModule-a60d0bf3cd80d7566f78e544b1b8790c8210c15a70ddfcb8fd0c9e6b88019ce070bebcbec154b54d9f8181e5e8b70c2dad1c27dfec6772d17967d7277f26a8a6"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-a60d0bf3cd80d7566f78e544b1b8790c8210c15a70ddfcb8fd0c9e6b88019ce070bebcbec154b54d9f8181e5e8b70c2dad1c27dfec6772d17967d7277f26a8a6"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-a60d0bf3cd80d7566f78e544b1b8790c8210c15a70ddfcb8fd0c9e6b88019ce070bebcbec154b54d9f8181e5e8b70c2dad1c27dfec6772d17967d7277f26a8a6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-a60d0bf3cd80d7566f78e544b1b8790c8210c15a70ddfcb8fd0c9e6b88019ce070bebcbec154b54d9f8181e5e8b70c2dad1c27dfec6772d17967d7277f26a8a6"' :
                                        'id="xs-injectables-links-module-AuthModule-a60d0bf3cd80d7566f78e544b1b8790c8210c15a70ddfcb8fd0c9e6b88019ce070bebcbec154b54d9f8181e5e8b70c2dad1c27dfec6772d17967d7277f26a8a6"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CatsModule.html" data-type="entity-link" >CatsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CatsModule-a52b1267dca6d29e6ab165c79c81098913296a385ff54c55f5294c4102d3875473094902e565e9a6c57774cb7c8e04838aa5019414db14bbbdb57be7a6a8af29"' : 'data-bs-target="#xs-controllers-links-module-CatsModule-a52b1267dca6d29e6ab165c79c81098913296a385ff54c55f5294c4102d3875473094902e565e9a6c57774cb7c8e04838aa5019414db14bbbdb57be7a6a8af29"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CatsModule-a52b1267dca6d29e6ab165c79c81098913296a385ff54c55f5294c4102d3875473094902e565e9a6c57774cb7c8e04838aa5019414db14bbbdb57be7a6a8af29"' :
                                            'id="xs-controllers-links-module-CatsModule-a52b1267dca6d29e6ab165c79c81098913296a385ff54c55f5294c4102d3875473094902e565e9a6c57774cb7c8e04838aa5019414db14bbbdb57be7a6a8af29"' }>
                                            <li class="link">
                                                <a href="controllers/CatsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CatsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CatsModule-a52b1267dca6d29e6ab165c79c81098913296a385ff54c55f5294c4102d3875473094902e565e9a6c57774cb7c8e04838aa5019414db14bbbdb57be7a6a8af29"' : 'data-bs-target="#xs-injectables-links-module-CatsModule-a52b1267dca6d29e6ab165c79c81098913296a385ff54c55f5294c4102d3875473094902e565e9a6c57774cb7c8e04838aa5019414db14bbbdb57be7a6a8af29"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CatsModule-a52b1267dca6d29e6ab165c79c81098913296a385ff54c55f5294c4102d3875473094902e565e9a6c57774cb7c8e04838aa5019414db14bbbdb57be7a6a8af29"' :
                                        'id="xs-injectables-links-module-CatsModule-a52b1267dca6d29e6ab165c79c81098913296a385ff54c55f5294c4102d3875473094902e565e9a6c57774cb7c8e04838aa5019414db14bbbdb57be7a6a8af29"' }>
                                        <li class="link">
                                            <a href="injectables/CatsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CatsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ClsModule.html" data-type="entity-link" >ClsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ClsModule-dfa05915d716c23a04920de1d8b4b1bcad10a45abd85a40b1f6c657792fcf06fee7aa3c8181c8345fd5d7380c6977aabb94fe133493b2d7d8fee4a2824dbaa3c"' : 'data-bs-target="#xs-controllers-links-module-ClsModule-dfa05915d716c23a04920de1d8b4b1bcad10a45abd85a40b1f6c657792fcf06fee7aa3c8181c8345fd5d7380c6977aabb94fe133493b2d7d8fee4a2824dbaa3c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ClsModule-dfa05915d716c23a04920de1d8b4b1bcad10a45abd85a40b1f6c657792fcf06fee7aa3c8181c8345fd5d7380c6977aabb94fe133493b2d7d8fee4a2824dbaa3c"' :
                                            'id="xs-controllers-links-module-ClsModule-dfa05915d716c23a04920de1d8b4b1bcad10a45abd85a40b1f6c657792fcf06fee7aa3c8181c8345fd5d7380c6977aabb94fe133493b2d7d8fee4a2824dbaa3c"' }>
                                            <li class="link">
                                                <a href="controllers/ContextController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ContextController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ClsModule-dfa05915d716c23a04920de1d8b4b1bcad10a45abd85a40b1f6c657792fcf06fee7aa3c8181c8345fd5d7380c6977aabb94fe133493b2d7d8fee4a2824dbaa3c"' : 'data-bs-target="#xs-injectables-links-module-ClsModule-dfa05915d716c23a04920de1d8b4b1bcad10a45abd85a40b1f6c657792fcf06fee7aa3c8181c8345fd5d7380c6977aabb94fe133493b2d7d8fee4a2824dbaa3c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ClsModule-dfa05915d716c23a04920de1d8b4b1bcad10a45abd85a40b1f6c657792fcf06fee7aa3c8181c8345fd5d7380c6977aabb94fe133493b2d7d8fee4a2824dbaa3c"' :
                                        'id="xs-injectables-links-module-ClsModule-dfa05915d716c23a04920de1d8b4b1bcad10a45abd85a40b1f6c657792fcf06fee7aa3c8181c8345fd5d7380c6977aabb94fe133493b2d7d8fee4a2824dbaa3c"' }>
                                        <li class="link">
                                            <a href="injectables/ContextService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ContextService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CoreRedisModule.html" data-type="entity-link" >CoreRedisModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DatabaseModule.html" data-type="entity-link" >DatabaseModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/InvoiceDetailsModule.html" data-type="entity-link" >InvoiceDetailsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-InvoiceDetailsModule-d79dcfeb4533d4379b9bbd4451b2d90effb9d7c1b457c74a8728d57e20fb7ac0a6c07b1791d27f5c7da0502e7239b346b2f8658c639864969619fc9b5eafe909"' : 'data-bs-target="#xs-controllers-links-module-InvoiceDetailsModule-d79dcfeb4533d4379b9bbd4451b2d90effb9d7c1b457c74a8728d57e20fb7ac0a6c07b1791d27f5c7da0502e7239b346b2f8658c639864969619fc9b5eafe909"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-InvoiceDetailsModule-d79dcfeb4533d4379b9bbd4451b2d90effb9d7c1b457c74a8728d57e20fb7ac0a6c07b1791d27f5c7da0502e7239b346b2f8658c639864969619fc9b5eafe909"' :
                                            'id="xs-controllers-links-module-InvoiceDetailsModule-d79dcfeb4533d4379b9bbd4451b2d90effb9d7c1b457c74a8728d57e20fb7ac0a6c07b1791d27f5c7da0502e7239b346b2f8658c639864969619fc9b5eafe909"' }>
                                            <li class="link">
                                                <a href="controllers/InvoiceDetailsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InvoiceDetailsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-InvoiceDetailsModule-d79dcfeb4533d4379b9bbd4451b2d90effb9d7c1b457c74a8728d57e20fb7ac0a6c07b1791d27f5c7da0502e7239b346b2f8658c639864969619fc9b5eafe909"' : 'data-bs-target="#xs-injectables-links-module-InvoiceDetailsModule-d79dcfeb4533d4379b9bbd4451b2d90effb9d7c1b457c74a8728d57e20fb7ac0a6c07b1791d27f5c7da0502e7239b346b2f8658c639864969619fc9b5eafe909"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-InvoiceDetailsModule-d79dcfeb4533d4379b9bbd4451b2d90effb9d7c1b457c74a8728d57e20fb7ac0a6c07b1791d27f5c7da0502e7239b346b2f8658c639864969619fc9b5eafe909"' :
                                        'id="xs-injectables-links-module-InvoiceDetailsModule-d79dcfeb4533d4379b9bbd4451b2d90effb9d7c1b457c74a8728d57e20fb7ac0a6c07b1791d27f5c7da0502e7239b346b2f8658c639864969619fc9b5eafe909"' }>
                                        <li class="link">
                                            <a href="injectables/InvoiceDetailsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InvoiceDetailsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/InvoiceMasterModule.html" data-type="entity-link" >InvoiceMasterModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-InvoiceMasterModule-23c18054b3ddd12ae41ec71150b85add5cc04035a9d57e8183d40681964116a6d4238c38354727bca32edb36f456c4a5143f3a48bd322ccd47f66ad96f047ef2"' : 'data-bs-target="#xs-controllers-links-module-InvoiceMasterModule-23c18054b3ddd12ae41ec71150b85add5cc04035a9d57e8183d40681964116a6d4238c38354727bca32edb36f456c4a5143f3a48bd322ccd47f66ad96f047ef2"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-InvoiceMasterModule-23c18054b3ddd12ae41ec71150b85add5cc04035a9d57e8183d40681964116a6d4238c38354727bca32edb36f456c4a5143f3a48bd322ccd47f66ad96f047ef2"' :
                                            'id="xs-controllers-links-module-InvoiceMasterModule-23c18054b3ddd12ae41ec71150b85add5cc04035a9d57e8183d40681964116a6d4238c38354727bca32edb36f456c4a5143f3a48bd322ccd47f66ad96f047ef2"' }>
                                            <li class="link">
                                                <a href="controllers/InvoiceMasterController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InvoiceMasterController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-InvoiceMasterModule-23c18054b3ddd12ae41ec71150b85add5cc04035a9d57e8183d40681964116a6d4238c38354727bca32edb36f456c4a5143f3a48bd322ccd47f66ad96f047ef2"' : 'data-bs-target="#xs-injectables-links-module-InvoiceMasterModule-23c18054b3ddd12ae41ec71150b85add5cc04035a9d57e8183d40681964116a6d4238c38354727bca32edb36f456c4a5143f3a48bd322ccd47f66ad96f047ef2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-InvoiceMasterModule-23c18054b3ddd12ae41ec71150b85add5cc04035a9d57e8183d40681964116a6d4238c38354727bca32edb36f456c4a5143f3a48bd322ccd47f66ad96f047ef2"' :
                                        'id="xs-injectables-links-module-InvoiceMasterModule-23c18054b3ddd12ae41ec71150b85add5cc04035a9d57e8183d40681964116a6d4238c38354727bca32edb36f456c4a5143f3a48bd322ccd47f66ad96f047ef2"' }>
                                        <li class="link">
                                            <a href="injectables/InvoiceMasterService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InvoiceMasterService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/OrdersModule.html" data-type="entity-link" >OrdersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-OrdersModule-b89ca013f338a5bee18723b88edb0c6b0885e28ecd87f47425c225f727c561991866e0214f5b8ba5dad5d3bb530b9dc39e4536feefe4a0fdaff402fe36a00cb0"' : 'data-bs-target="#xs-controllers-links-module-OrdersModule-b89ca013f338a5bee18723b88edb0c6b0885e28ecd87f47425c225f727c561991866e0214f5b8ba5dad5d3bb530b9dc39e4536feefe4a0fdaff402fe36a00cb0"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-OrdersModule-b89ca013f338a5bee18723b88edb0c6b0885e28ecd87f47425c225f727c561991866e0214f5b8ba5dad5d3bb530b9dc39e4536feefe4a0fdaff402fe36a00cb0"' :
                                            'id="xs-controllers-links-module-OrdersModule-b89ca013f338a5bee18723b88edb0c6b0885e28ecd87f47425c225f727c561991866e0214f5b8ba5dad5d3bb530b9dc39e4536feefe4a0fdaff402fe36a00cb0"' }>
                                            <li class="link">
                                                <a href="controllers/OrdersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrdersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-OrdersModule-b89ca013f338a5bee18723b88edb0c6b0885e28ecd87f47425c225f727c561991866e0214f5b8ba5dad5d3bb530b9dc39e4536feefe4a0fdaff402fe36a00cb0"' : 'data-bs-target="#xs-injectables-links-module-OrdersModule-b89ca013f338a5bee18723b88edb0c6b0885e28ecd87f47425c225f727c561991866e0214f5b8ba5dad5d3bb530b9dc39e4536feefe4a0fdaff402fe36a00cb0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-OrdersModule-b89ca013f338a5bee18723b88edb0c6b0885e28ecd87f47425c225f727c561991866e0214f5b8ba5dad5d3bb530b9dc39e4536feefe4a0fdaff402fe36a00cb0"' :
                                        'id="xs-injectables-links-module-OrdersModule-b89ca013f338a5bee18723b88edb0c6b0885e28ecd87f47425c225f727c561991866e0214f5b8ba5dad5d3bb530b9dc39e4536feefe4a0fdaff402fe36a00cb0"' }>
                                        <li class="link">
                                            <a href="injectables/OrdersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrdersService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TestProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TestProvider</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductsModule.html" data-type="entity-link" >ProductsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ProductsModule-77e699aed01622a454ec18fadae56ea176ff6e699acbba5a425a3cabbb2695ffb887384a9093de6f2bacf474ee612267de462b3efe97e47b74a9a03969c9d9c7"' : 'data-bs-target="#xs-controllers-links-module-ProductsModule-77e699aed01622a454ec18fadae56ea176ff6e699acbba5a425a3cabbb2695ffb887384a9093de6f2bacf474ee612267de462b3efe97e47b74a9a03969c9d9c7"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProductsModule-77e699aed01622a454ec18fadae56ea176ff6e699acbba5a425a3cabbb2695ffb887384a9093de6f2bacf474ee612267de462b3efe97e47b74a9a03969c9d9c7"' :
                                            'id="xs-controllers-links-module-ProductsModule-77e699aed01622a454ec18fadae56ea176ff6e699acbba5a425a3cabbb2695ffb887384a9093de6f2bacf474ee612267de462b3efe97e47b74a9a03969c9d9c7"' }>
                                            <li class="link">
                                                <a href="controllers/ProductsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ProductsModule-77e699aed01622a454ec18fadae56ea176ff6e699acbba5a425a3cabbb2695ffb887384a9093de6f2bacf474ee612267de462b3efe97e47b74a9a03969c9d9c7"' : 'data-bs-target="#xs-injectables-links-module-ProductsModule-77e699aed01622a454ec18fadae56ea176ff6e699acbba5a425a3cabbb2695ffb887384a9093de6f2bacf474ee612267de462b3efe97e47b74a9a03969c9d9c7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProductsModule-77e699aed01622a454ec18fadae56ea176ff6e699acbba5a425a3cabbb2695ffb887384a9093de6f2bacf474ee612267de462b3efe97e47b74a9a03969c9d9c7"' :
                                        'id="xs-injectables-links-module-ProductsModule-77e699aed01622a454ec18fadae56ea176ff6e699acbba5a425a3cabbb2695ffb887384a9093de6f2bacf474ee612267de462b3efe97e47b74a9a03969c9d9c7"' }>
                                        <li class="link">
                                            <a href="injectables/ProductsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RabbitMQExampleModule.html" data-type="entity-link" >RabbitMQExampleModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-RabbitMQExampleModule-f212e5bf61490b5361074624eecc352570091bac22950d43ce979bf855c6f39e92df26a5eac210defaae540d0296f3b7988d60223724ef4187b1d0f53f59d198"' : 'data-bs-target="#xs-controllers-links-module-RabbitMQExampleModule-f212e5bf61490b5361074624eecc352570091bac22950d43ce979bf855c6f39e92df26a5eac210defaae540d0296f3b7988d60223724ef4187b1d0f53f59d198"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RabbitMQExampleModule-f212e5bf61490b5361074624eecc352570091bac22950d43ce979bf855c6f39e92df26a5eac210defaae540d0296f3b7988d60223724ef4187b1d0f53f59d198"' :
                                            'id="xs-controllers-links-module-RabbitMQExampleModule-f212e5bf61490b5361074624eecc352570091bac22950d43ce979bf855c6f39e92df26a5eac210defaae540d0296f3b7988d60223724ef4187b1d0f53f59d198"' }>
                                            <li class="link">
                                                <a href="controllers/ExampleController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExampleController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RabbitMQModule.html" data-type="entity-link" >RabbitMQModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-RabbitMQModule-5e2ae9c49aea0421614fb158be499d19b545bd654d8655835c38963de62994383203b5a4f1fbe74c5f9bd9fb88f9c5f75461889ff997bd09f76c4c89c09604c6"' : 'data-bs-target="#xs-injectables-links-module-RabbitMQModule-5e2ae9c49aea0421614fb158be499d19b545bd654d8655835c38963de62994383203b5a4f1fbe74c5f9bd9fb88f9c5f75461889ff997bd09f76c4c89c09604c6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RabbitMQModule-5e2ae9c49aea0421614fb158be499d19b545bd654d8655835c38963de62994383203b5a4f1fbe74c5f9bd9fb88f9c5f75461889ff997bd09f76c4c89c09604c6"' :
                                        'id="xs-injectables-links-module-RabbitMQModule-5e2ae9c49aea0421614fb158be499d19b545bd654d8655835c38963de62994383203b5a4f1fbe74c5f9bd9fb88f9c5f75461889ff997bd09f76c4c89c09604c6"' }>
                                        <li class="link">
                                            <a href="injectables/PublisherService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PublisherService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SubscriberService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubscriberService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RedisModule.html" data-type="entity-link" >RedisModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-RedisModule-ba86bb55e0cd9a0bd3abc42656bb6ad50fb11d622bf3db5e2a160a612d84f54978f52383f5a2adff519052d5b3d84b1a4246f0fe939b4a5e59e7ac6a2c57c111"' : 'data-bs-target="#xs-controllers-links-module-RedisModule-ba86bb55e0cd9a0bd3abc42656bb6ad50fb11d622bf3db5e2a160a612d84f54978f52383f5a2adff519052d5b3d84b1a4246f0fe939b4a5e59e7ac6a2c57c111"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RedisModule-ba86bb55e0cd9a0bd3abc42656bb6ad50fb11d622bf3db5e2a160a612d84f54978f52383f5a2adff519052d5b3d84b1a4246f0fe939b4a5e59e7ac6a2c57c111"' :
                                            'id="xs-controllers-links-module-RedisModule-ba86bb55e0cd9a0bd3abc42656bb6ad50fb11d622bf3db5e2a160a612d84f54978f52383f5a2adff519052d5b3d84b1a4246f0fe939b4a5e59e7ac6a2c57c111"' }>
                                            <li class="link">
                                                <a href="controllers/RedisController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RedisController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-RedisModule-ba86bb55e0cd9a0bd3abc42656bb6ad50fb11d622bf3db5e2a160a612d84f54978f52383f5a2adff519052d5b3d84b1a4246f0fe939b4a5e59e7ac6a2c57c111"' : 'data-bs-target="#xs-injectables-links-module-RedisModule-ba86bb55e0cd9a0bd3abc42656bb6ad50fb11d622bf3db5e2a160a612d84f54978f52383f5a2adff519052d5b3d84b1a4246f0fe939b4a5e59e7ac6a2c57c111"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RedisModule-ba86bb55e0cd9a0bd3abc42656bb6ad50fb11d622bf3db5e2a160a612d84f54978f52383f5a2adff519052d5b3d84b1a4246f0fe939b4a5e59e7ac6a2c57c111"' :
                                        'id="xs-injectables-links-module-RedisModule-ba86bb55e0cd9a0bd3abc42656bb6ad50fb11d622bf3db5e2a160a612d84f54978f52383f5a2adff519052d5b3d84b1a4246f0fe939b4a5e59e7ac6a2c57c111"' }>
                                        <li class="link">
                                            <a href="injectables/RedisPubSubService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RedisPubSubService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RedisService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RedisService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TasksModule.html" data-type="entity-link" >TasksModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TasksModule-6e039cb716c2b1ce5d7e9cb57bf1c0cdb3306733b5189d2fb35aaccd40629a7cb7bd2ccd347463a4cdd82256a35dd4bf2fc3382a7b1869141defefbf62074fb2"' : 'data-bs-target="#xs-injectables-links-module-TasksModule-6e039cb716c2b1ce5d7e9cb57bf1c0cdb3306733b5189d2fb35aaccd40629a7cb7bd2ccd347463a4cdd82256a35dd4bf2fc3382a7b1869141defefbf62074fb2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TasksModule-6e039cb716c2b1ce5d7e9cb57bf1c0cdb3306733b5189d2fb35aaccd40629a7cb7bd2ccd347463a4cdd82256a35dd4bf2fc3382a7b1869141defefbf62074fb2"' :
                                        'id="xs-injectables-links-module-TasksModule-6e039cb716c2b1ce5d7e9cb57bf1c0cdb3306733b5189d2fb35aaccd40629a7cb7bd2ccd347463a4cdd82256a35dd4bf2fc3382a7b1869141defefbf62074fb2"' }>
                                        <li class="link">
                                            <a href="injectables/TasksService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TasksService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TemplatePlaygroundModule.html" data-type="entity-link" >TemplatePlaygroundModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' : 'data-bs-target="#xs-components-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' :
                                            'id="xs-components-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' }>
                                            <li class="link">
                                                <a href="components/TemplatePlaygroundComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TemplatePlaygroundComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' : 'data-bs-target="#xs-injectables-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' :
                                        'id="xs-injectables-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' }>
                                        <li class="link">
                                            <a href="injectables/HbsRenderService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HbsRenderService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TemplateEditorService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TemplateEditorService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ZipExportService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ZipExportService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-331995a3a7de89d2b6442b1dec8bab95134cabcee7a000e940fa07812f0549ed5fd1e8501429f347fd6cbf05d9d6116d4ef240dc5525e175b07eede02b8ba9a2"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-331995a3a7de89d2b6442b1dec8bab95134cabcee7a000e940fa07812f0549ed5fd1e8501429f347fd6cbf05d9d6116d4ef240dc5525e175b07eede02b8ba9a2"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-331995a3a7de89d2b6442b1dec8bab95134cabcee7a000e940fa07812f0549ed5fd1e8501429f347fd6cbf05d9d6116d4ef240dc5525e175b07eede02b8ba9a2"' :
                                            'id="xs-controllers-links-module-UsersModule-331995a3a7de89d2b6442b1dec8bab95134cabcee7a000e940fa07812f0549ed5fd1e8501429f347fd6cbf05d9d6116d4ef240dc5525e175b07eede02b8ba9a2"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-331995a3a7de89d2b6442b1dec8bab95134cabcee7a000e940fa07812f0549ed5fd1e8501429f347fd6cbf05d9d6116d4ef240dc5525e175b07eede02b8ba9a2"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-331995a3a7de89d2b6442b1dec8bab95134cabcee7a000e940fa07812f0549ed5fd1e8501429f347fd6cbf05d9d6116d4ef240dc5525e175b07eede02b8ba9a2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-331995a3a7de89d2b6442b1dec8bab95134cabcee7a000e940fa07812f0549ed5fd1e8501429f347fd6cbf05d9d6116d4ef240dc5525e175b07eede02b8ba9a2"' :
                                        'id="xs-injectables-links-module-UsersModule-331995a3a7de89d2b6442b1dec8bab95134cabcee7a000e940fa07812f0549ed5fd1e8501429f347fd6cbf05d9d6116d4ef240dc5525e175b07eede02b8ba9a2"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/InvoiceDetail.html" data-type="entity-link" >InvoiceDetail</a>
                                </li>
                                <li class="link">
                                    <a href="entities/InvoiceMaster.html" data-type="entity-link" >InvoiceMaster</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Product.html" data-type="entity-link" >Product</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AddGinIndexes1694680000000.html" data-type="entity-link" >AddGinIndexes1694680000000</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddGinIndexes1694680000000-1.html" data-type="entity-link" >AddGinIndexes1694680000000</a>
                            </li>
                            <li class="link">
                                <a href="classes/Cat.html" data-type="entity-link" >Cat</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCatDto.html" data-type="entity-link" >CreateCatDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateInvoiceDetailDto.html" data-type="entity-link" >CreateInvoiceDetailDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateInvoiceMasterDto.html" data-type="entity-link" >CreateInvoiceMasterDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateOrderDto.html" data-type="entity-link" >CreateOrderDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProductDto.html" data-type="entity-link" >CreateProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/FindProductsDto.html" data-type="entity-link" >FindProductsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/HttpExceptionFilter.html" data-type="entity-link" >HttpExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/Migrations1768283450624.html" data-type="entity-link" >Migrations1768283450624</a>
                            </li>
                            <li class="link">
                                <a href="classes/Order.html" data-type="entity-link" >Order</a>
                            </li>
                            <li class="link">
                                <a href="classes/Product.html" data-type="entity-link" >Product</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCatDto.html" data-type="entity-link" >UpdateCatDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateInvoiceDetailDto.html" data-type="entity-link" >UpdateInvoiceDetailDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateInvoiceMasterDto.html" data-type="entity-link" >UpdateInvoiceMasterDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateOrderDto.html" data-type="entity-link" >UpdateOrderDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateProductDto.html" data-type="entity-link" >UpdateProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ZodValidationPipe.html" data-type="entity-link" >ZodValidationPipe</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/BackgroundTaskService.html" data-type="entity-link" >BackgroundTaskService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BroadcastService.html" data-type="entity-link" >BroadcastService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ContextMiddleware.html" data-type="entity-link" >ContextMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link" >LocalAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LogAggregationService.html" data-type="entity-link" >LogAggregationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OrderProcessingService.html" data-type="entity-link" >OrderProcessingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RabbitMQService.html" data-type="entity-link" >RabbitMQService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TestProvider.html" data-type="entity-link" >TestProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ValidationPipe.html" data-type="entity-link" >ValidationPipe</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/CompoDocConfig.html" data-type="entity-link" >CompoDocConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RabbitMQConfig.html" data-type="entity-link" >RabbitMQConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequestContext.html" data-type="entity-link" >RequestContext</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Session.html" data-type="entity-link" >Session</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Template.html" data-type="entity-link" >Template</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});