Images = new FS.Collection("images", {
  stores: [
    new FS.Store.GridFS("small"),
    new FS.Store.GridFS("medium"),
    new FS.Store.GridFS("large")
  ]
});

Images.allow({
  download: function() {
    return true;
  }
});

Meteor.publish("image", function(imageId) {
  check(imageId, String);
  return Images.find({ _id: imageId });
});

Meteor.publish("images", function(imageId) {
  return Images.find();
});