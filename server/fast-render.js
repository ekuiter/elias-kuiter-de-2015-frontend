Meteor.startup(function() {
  FastRender.onAllRoutes(function() {
    this.subscribe("categories");
  });

  FastRender.route("/:categorySlug", function(params) {
    this.subscribe("projectsInCategory", params.categorySlug);
    this.subscribe("imagesForCategory", params.categorySlug);
  });

  FastRender.route("/:categorySlug/:projectSlug", function(params) {
    this.subscribe("projectsInCategory", params.categorySlug);
    this.subscribe("project", params.categorySlug, params.projectSlug);
    this.subscribe("imagesForProject", params.categorySlug, params.projectSlug);
  });
});