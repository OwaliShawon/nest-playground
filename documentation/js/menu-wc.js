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
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-621501e45db00cbc09203c4b1b624e08c40acfbf4641c9cb4967f19743ac178a576fbbb257c3f3181ab725816754d8b3cacb9fe4c711b90bd5e4921e82f9a937"' : 'data-bs-target="#xs-controllers-links-module-AppModule-621501e45db00cbc09203c4b1b624e08c40acfbf4641c9cb4967f19743ac178a576fbbb257c3f3181ab725816754d8b3cacb9fe4c711b90bd5e4921e82f9a937"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-621501e45db00cbc09203c4b1b624e08c40acfbf4641c9cb4967f19743ac178a576fbbb257c3f3181ab725816754d8b3cacb9fe4c711b90bd5e4921e82f9a937"' :
                                            'id="xs-controllers-links-module-AppModule-621501e45db00cbc09203c4b1b624e08c40acfbf4641c9cb4967f19743ac178a576fbbb257c3f3181ab725816754d8b3cacb9fe4c711b90bd5e4921e82f9a937"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-621501e45db00cbc09203c4b1b624e08c40acfbf4641c9cb4967f19743ac178a576fbbb257c3f3181ab725816754d8b3cacb9fe4c711b90bd5e4921e82f9a937"' : 'data-bs-target="#xs-injectables-links-module-AppModule-621501e45db00cbc09203c4b1b624e08c40acfbf4641c9cb4967f19743ac178a576fbbb257c3f3181ab725816754d8b3cacb9fe4c711b90bd5e4921e82f9a937"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-621501e45db00cbc09203c4b1b624e08c40acfbf4641c9cb4967f19743ac178a576fbbb257c3f3181ab725816754d8b3cacb9fe4c711b90bd5e4921e82f9a937"' :
                                        'id="xs-injectables-links-module-AppModule-621501e45db00cbc09203c4b1b624e08c40acfbf4641c9cb4967f19743ac178a576fbbb257c3f3181ab725816754d8b3cacb9fe4c711b90bd5e4921e82f9a937"' }>
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
                                            'data-bs-target="#controllers-links-module-AuthModule-8f082ce27e2bdbac9336d4127478dcfe4706a15f4498410c351c6079f32daa0fab784691f34942040863196314000f21ea1285ce0270b482e5d6e7c22f9e382a"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-8f082ce27e2bdbac9336d4127478dcfe4706a15f4498410c351c6079f32daa0fab784691f34942040863196314000f21ea1285ce0270b482e5d6e7c22f9e382a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-8f082ce27e2bdbac9336d4127478dcfe4706a15f4498410c351c6079f32daa0fab784691f34942040863196314000f21ea1285ce0270b482e5d6e7c22f9e382a"' :
                                            'id="xs-controllers-links-module-AuthModule-8f082ce27e2bdbac9336d4127478dcfe4706a15f4498410c351c6079f32daa0fab784691f34942040863196314000f21ea1285ce0270b482e5d6e7c22f9e382a"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-8f082ce27e2bdbac9336d4127478dcfe4706a15f4498410c351c6079f32daa0fab784691f34942040863196314000f21ea1285ce0270b482e5d6e7c22f9e382a"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-8f082ce27e2bdbac9336d4127478dcfe4706a15f4498410c351c6079f32daa0fab784691f34942040863196314000f21ea1285ce0270b482e5d6e7c22f9e382a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-8f082ce27e2bdbac9336d4127478dcfe4706a15f4498410c351c6079f32daa0fab784691f34942040863196314000f21ea1285ce0270b482e5d6e7c22f9e382a"' :
                                        'id="xs-injectables-links-module-AuthModule-8f082ce27e2bdbac9336d4127478dcfe4706a15f4498410c351c6079f32daa0fab784691f34942040863196314000f21ea1285ce0270b482e5d6e7c22f9e382a"' }>
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
                                <a href="modules/DatabaseModule.html" data-type="entity-link" >DatabaseModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/OrdersModule.html" data-type="entity-link" >OrdersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-OrdersModule-5fb7b55578461480865d565a92e7af5a74a3a0331f66f0b1a78d90ad9a97b20dcd867759a442ab3e8a60b0c99554266b4c46358f889131c192f3bbf409f33ee1"' : 'data-bs-target="#xs-controllers-links-module-OrdersModule-5fb7b55578461480865d565a92e7af5a74a3a0331f66f0b1a78d90ad9a97b20dcd867759a442ab3e8a60b0c99554266b4c46358f889131c192f3bbf409f33ee1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-OrdersModule-5fb7b55578461480865d565a92e7af5a74a3a0331f66f0b1a78d90ad9a97b20dcd867759a442ab3e8a60b0c99554266b4c46358f889131c192f3bbf409f33ee1"' :
                                            'id="xs-controllers-links-module-OrdersModule-5fb7b55578461480865d565a92e7af5a74a3a0331f66f0b1a78d90ad9a97b20dcd867759a442ab3e8a60b0c99554266b4c46358f889131c192f3bbf409f33ee1"' }>
                                            <li class="link">
                                                <a href="controllers/OrdersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrdersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-OrdersModule-5fb7b55578461480865d565a92e7af5a74a3a0331f66f0b1a78d90ad9a97b20dcd867759a442ab3e8a60b0c99554266b4c46358f889131c192f3bbf409f33ee1"' : 'data-bs-target="#xs-injectables-links-module-OrdersModule-5fb7b55578461480865d565a92e7af5a74a3a0331f66f0b1a78d90ad9a97b20dcd867759a442ab3e8a60b0c99554266b4c46358f889131c192f3bbf409f33ee1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-OrdersModule-5fb7b55578461480865d565a92e7af5a74a3a0331f66f0b1a78d90ad9a97b20dcd867759a442ab3e8a60b0c99554266b4c46358f889131c192f3bbf409f33ee1"' :
                                        'id="xs-injectables-links-module-OrdersModule-5fb7b55578461480865d565a92e7af5a74a3a0331f66f0b1a78d90ad9a97b20dcd867759a442ab3e8a60b0c99554266b4c46358f889131c192f3bbf409f33ee1"' }>
                                        <li class="link">
                                            <a href="injectables/OrdersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrdersService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ProductsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductsService</a>
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
                                            'data-bs-target="#controllers-links-module-ProductsModule-f14927f72516b6a0cad32bc5d041059596e508e5653b8a90f193372a4e02cca1468fee5c0860e1a99e10c3bb74b76b3a791d86082f7f3e9df519fe338ad93397"' : 'data-bs-target="#xs-controllers-links-module-ProductsModule-f14927f72516b6a0cad32bc5d041059596e508e5653b8a90f193372a4e02cca1468fee5c0860e1a99e10c3bb74b76b3a791d86082f7f3e9df519fe338ad93397"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProductsModule-f14927f72516b6a0cad32bc5d041059596e508e5653b8a90f193372a4e02cca1468fee5c0860e1a99e10c3bb74b76b3a791d86082f7f3e9df519fe338ad93397"' :
                                            'id="xs-controllers-links-module-ProductsModule-f14927f72516b6a0cad32bc5d041059596e508e5653b8a90f193372a4e02cca1468fee5c0860e1a99e10c3bb74b76b3a791d86082f7f3e9df519fe338ad93397"' }>
                                            <li class="link">
                                                <a href="controllers/ProductsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ProductsModule-f14927f72516b6a0cad32bc5d041059596e508e5653b8a90f193372a4e02cca1468fee5c0860e1a99e10c3bb74b76b3a791d86082f7f3e9df519fe338ad93397"' : 'data-bs-target="#xs-injectables-links-module-ProductsModule-f14927f72516b6a0cad32bc5d041059596e508e5653b8a90f193372a4e02cca1468fee5c0860e1a99e10c3bb74b76b3a791d86082f7f3e9df519fe338ad93397"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProductsModule-f14927f72516b6a0cad32bc5d041059596e508e5653b8a90f193372a4e02cca1468fee5c0860e1a99e10c3bb74b76b3a791d86082f7f3e9df519fe338ad93397"' :
                                        'id="xs-injectables-links-module-ProductsModule-f14927f72516b6a0cad32bc5d041059596e508e5653b8a90f193372a4e02cca1468fee5c0860e1a99e10c3bb74b76b3a791d86082f7f3e9df519fe338ad93397"' }>
                                        <li class="link">
                                            <a href="injectables/ProductsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-f34b54db4fe6fb896c2288c0cad5f21f42513ed6ade70f1e1aff9191fe269127569fe1b09fed35cd0eb3df9e9fd408b5b038dff324263f0aeda4d65c7194ec6c"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-f34b54db4fe6fb896c2288c0cad5f21f42513ed6ade70f1e1aff9191fe269127569fe1b09fed35cd0eb3df9e9fd408b5b038dff324263f0aeda4d65c7194ec6c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-f34b54db4fe6fb896c2288c0cad5f21f42513ed6ade70f1e1aff9191fe269127569fe1b09fed35cd0eb3df9e9fd408b5b038dff324263f0aeda4d65c7194ec6c"' :
                                            'id="xs-controllers-links-module-UsersModule-f34b54db4fe6fb896c2288c0cad5f21f42513ed6ade70f1e1aff9191fe269127569fe1b09fed35cd0eb3df9e9fd408b5b038dff324263f0aeda4d65c7194ec6c"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-f34b54db4fe6fb896c2288c0cad5f21f42513ed6ade70f1e1aff9191fe269127569fe1b09fed35cd0eb3df9e9fd408b5b038dff324263f0aeda4d65c7194ec6c"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-f34b54db4fe6fb896c2288c0cad5f21f42513ed6ade70f1e1aff9191fe269127569fe1b09fed35cd0eb3df9e9fd408b5b038dff324263f0aeda4d65c7194ec6c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-f34b54db4fe6fb896c2288c0cad5f21f42513ed6ade70f1e1aff9191fe269127569fe1b09fed35cd0eb3df9e9fd408b5b038dff324263f0aeda4d65c7194ec6c"' :
                                        'id="xs-injectables-links-module-UsersModule-f34b54db4fe6fb896c2288c0cad5f21f42513ed6ade70f1e1aff9191fe269127569fe1b09fed35cd0eb3df9e9fd408b5b038dff324263f0aeda4d65c7194ec6c"' }>
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
                                <a href="classes/CreateOrderDto.html" data-type="entity-link" >CreateOrderDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProductDto.html" data-type="entity-link" >CreateProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Order.html" data-type="entity-link" >Order</a>
                            </li>
                            <li class="link">
                                <a href="classes/Product.html" data-type="entity-link" >Product</a>
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
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link" >LocalAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TestProvider.html" data-type="entity-link" >TestProvider</a>
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
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
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