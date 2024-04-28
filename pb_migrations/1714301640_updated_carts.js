/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6yndc7kh24i4foa")

  collection.viewRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6yndc7kh24i4foa")

  collection.viewRule = "@request.auth.id = user.id"

  return dao.saveCollection(collection)
})
