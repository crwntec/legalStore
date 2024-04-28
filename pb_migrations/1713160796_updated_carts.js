/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6yndc7kh24i4foa")

  collection.createRule = "@request.auth.verified = true"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6yndc7kh24i4foa")

  collection.createRule = "  @request.auth.id = @collection.carts.user.id"

  return dao.saveCollection(collection)
})
