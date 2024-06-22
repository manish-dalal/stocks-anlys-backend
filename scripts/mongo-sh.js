// db.v1_mdisk_urls.updateMany({},{ $set: {"isDeleted": false} })

const arr = []

var count = 1
arr.forEach((el) => {
  db.v1_mdisk_messages.updateOne({ text: { $regex: el } }, { $set: { isDeleted: true } })
  console.log('index', count)
  count++
})

var count = 1
arr.forEach((el) => {
  db.v1_mdisk_urls.updateOne({ url: { $regex: el } }, { $set: { isDeleted: true } })
  console.log('index', count)
  count++
})

db['v1_terabox_messages'].aggregate([
  {
    $match: { isDeleted: false }
  },
  { $group: { _id: '$category', count: { $sum: 1 } } },
  { $sort: { _id: -1 } }
])

{
  filter: {
    isDeleted: false,
    botToken: {
      $in: [
      '2056215354:AAEA7QHWoMDRKv41K7pjELmH-fjwu3SICrQ',
      '5311112853:AAGoEkdFls2ZZ0pPYuUDmCrWgpcGynlITHM'
      ]
    }
  }
}

82%
{isDeleted: false,botToken: '5171240385:AAHNQb8pmQNYYPzXNRMDclnUyau-ozE2_rQ'} 
18%
{isDeleted: false,botToken: '5704907153:AAG4vqKygZlmghfM88SP3vdk5MX_Qi58Vpw'}

var count = 1
var arr = db.new_tasks.find()
arr.forEach((el) => {
  if (!Array.isArray(el.categoryState)) {
    console.log("typeee", Array.isArray(el.categoryState) );
    console.log('index', count)
    // db.new_tasks.updateOne({ _id: el._id }, { $set: { categoryState: [el.categoryState] } })
  }
  count++
})

// isNewMdisk

db.new_tasks.updateMany({ isDeleted: false,botToken: '5311112853:AAGoEkdFls2ZZ0pPYuUDmCrWgpcGynlITHM' }, { $set: { isNewMdisk: true } })


db.new_tasks.updateMany({botToken: '5171240385:AAHNQb8pmQNYYPzXNRMDclnUyau-ozE2_rQ', isDeleted: false, channelName: {$nin: ["world_xprime"] } }, { $set: { channelName: 'world_xprime' } } )

// 5704907153:AAG4vqKygZlmghfM88SP3vdk5MX_Qi58Vpw

db.new_tasks.updateMany({ channelName: 'xkhubnew_all'}, { $set: { channelName: 'xkhubnew6'} })

{ created: { $gte: new ISODate("2023-03-14T00:40:19.157+00:00") }}
