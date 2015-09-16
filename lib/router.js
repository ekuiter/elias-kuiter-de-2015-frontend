Meteor.startup(function() {
  Router.configure({
    layoutTemplate: "applicationLayout",
    loadingTemplate: "loading",
    onBeforeAction: (function() {
      if (Meteor.isClient)
        var defaultTitle = document.title;
      return function() {
        var title = this.route.options.title;
        if (typeof title === "function")
          title = title.apply(this);
        document.title = title ? title + " | " + defaultTitle : defaultTitle;
        this.next();
      };
    })()
  });

  EmptyController = RouteController.extend({
    action: function() {
      this.render(null);
    }
  });

  Router.route("/", { controller: "EmptyController",  name: "home" });
  Router.route("/imprint", { template: "imprintRoute", title: "Imprint" });
  Router.route("/404", { name: "notFound", template: "notFoundRoute", title: "Not Found" });

  Router.route("/:categorySlug/:projectSlug", {
    template: "projectRoute",
    waitOn: function() {
      return Meteor.subscribe("project", this.params.categorySlug, this.params.projectSlug);
    },
    data: function() {
      return Projects.findOne({ categorySlug: this.params.categorySlug, slug: this.params.projectSlug });
    },
    title: function() {
      var project = this.data();
      return project && project.title;
    },
    action: function() {
      if (this.data())
        this.render();
      else
        Router.go("notFound");
    }
  });

  Router.route("/:categorySlug", {
    controller: "EmptyController",
    name: "category",
    title: function() {
      var category = Categories.findOne({ slug: this.params.categorySlug });
      return category && category.title;
    }
  });

  Router.route("/(.*)", function() {
    Router.go("notFound");
  });
});