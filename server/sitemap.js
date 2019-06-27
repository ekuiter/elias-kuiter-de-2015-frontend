Meteor.startup(function() {
    sitemaps.add('/sitemap.xml', function() {
        return [
            { page: "/" },
            { page: "/impressum" },
            { page: "/datenschutz" }
        ].
            concat(Categories.find().map(function(category) {
                return { page: category.slug };
            })).
            concat(Projects.find().map(function(project) {
                return { page: project.categorySlug + "/" + project.slug };
            }));
    });
});
