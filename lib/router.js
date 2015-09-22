Meteor.startup(function() {
  Router.configure({
    layoutTemplate: "applicationLayout",
    loadingTemplate: "loading",
    onBeforeAction: (function() {
      if (Meteor.isClient)
        App.defaultTitle = document.title;
      return function() {
        Session.set("isNotFound", false);
        App.setTitle(this.route.options.title, this);
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
  Router.route("/impressum", { template: "imprintRoute", title: "Impressum" });
  Router.route("/datenschutz", { template: "privacyRoute", title: "Datenschutz" });

  Router.route("/:categorySlug/:projectSlug/:imageNumber?", {
    template: "projectRoute",
    waitOn: function() {
      return [
        Meteor.subscribe("project", this.params.categorySlug, this.params.projectSlug),
        Meteor.subscribe("imagesForProject", this.params.categorySlug, this.params.projectSlug)
      ];
    },
    data: function() {
      return Projects.findOne({ categorySlug: this.params.categorySlug, slug: this.params.projectSlug });
    },
    title: function() {
      var project = this.data();
      return project && project.title;
    },
    action: function() {
      if (this.data()) {
        this.render();
        if (this.params.imageNumber)
          this.render("projectImage", { to: "details" });
        else
          this.render("projectDescription", { to: "details" });
      } else
        App.renderNotFound();
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
    App.renderNotFound();
  });
});