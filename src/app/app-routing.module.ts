import { NgModule } from "@angular/core";
import {
  Routes,
  RouterModule,
  PreloadAllModules,
  UrlSerializer,
} from "@angular/router";
import { AboutComponent } from "./about/about.component";
import { ChatComponent } from "./chat/chat.component";
import { CanLoadAuthGuard } from "./courses/services/can-load-auth.guard";
import { LoginComponent } from "./login/login.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { CustomPreloadingStrategy } from "./services/custom-preloading.strategy";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/courses",
    pathMatch: "full",
  },
  // Lazy load config exemple
  {
    path: "courses",
    //canLoad: [CanLoadAuthGuard],
    loadChildren: () =>
      import("./courses/courses.module").then((module) => module.CoursesModule),
    data: {
      preload: false,
    },
  },
  { path: "about", component: AboutComponent },
  { path: "login", component: LoginComponent },
  { path: "helpdesk-chat", component: ChatComponent, outlet: "chat" },
  { path: "**", component: PageNotFoundComponent }, // needs to be the last route
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: CustomPreloadingStrategy,
      scrollPositionRestoration: "enabled",
      paramsInheritanceStrategy: "always", // todos os parametros da rota ficam disponíveis
      relativeLinkResolution: "corrected",
      malformedUriErrorHandler: (
        error: URIError,
        urlSerializer: UrlSerializer,
        url: string
      ) => {
        return urlSerializer.parse("/page-not-found"); // essa rota não existe e vai acabar caindo na regra "**"
      },
    }),
  ],
  exports: [RouterModule],
  providers: [CanLoadAuthGuard, CustomPreloadingStrategy],
})
export class AppRoutingModule {}
