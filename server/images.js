FS.TempStore.Storage = new FS.Store.GridFSReadOnly("_tempstore", { internal: true });

Images = new FS.Collection("images", {
  stores: [
    new FS.Store.GridFSReadOnly("small"),
    new FS.Store.GridFSReadOnly("medium"),
    new FS.Store.GridFSReadOnly("large")
  ]
});

Images.allow({
  download: function() {
    return true;
  }
});

Meteor.publish("imagesForCategory", function(categorySlug) {
  check(categorySlug, String);
  var imageIds = Projects.find({ categorySlug: categorySlug }).map(function(project) {
    return project.imageIds[0];
  });
  return Images.find({ _id: { $in: imageIds } });
});

Meteor.publish("imagesForProject", function(categorySlug, projectSlug) {
  check(categorySlug, String);
  check(projectSlug, String);
  var project = Projects.findOne({ categorySlug: categorySlug, slug: projectSlug });
  if (!project)
    return this.ready();
  return Images.find({ _id: { $in: project.imageIds } });
});