Images = new FS.Collection("images", {
  stores: [
    new FS.Store.GridFSReadOnly("small"),
    new FS.Store.GridFSReadOnly("medium"),
    new FS.Store.GridFSReadOnly("large")
  ]
});