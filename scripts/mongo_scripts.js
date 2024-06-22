db.v1_dood_messages.find().forEach(function (myDoc) {
  const cat = myDoc.category.toString()
  db.v1_dood_messages.updateOne({ _id: myDoc._id }, { $set: { category: cat } })
})

// { text:  { $regex: /Raid/, $options: 'i' }},
// 2022-04-30T06:40:10.321+00:00

var count = 1
db.tasks.find({ botToken: '5353424234:AAGn1_NDS_58BXXpAqnc85QmNkgnT6vUvwc' }).forEach(function (myDoc) {
  const cat = myDoc.category.toString()
  db.tasks.updateOne({ _id: myDoc._id }, { $set: { botToken: '5311112853:AAGoEkdFls2ZZ0pPYuUDmCrWgpcGynlITHM' } })
  console.log('index', count)
  count++
})

// { category: "4", imgDriveId: { $nin: ['', null] }, cloudinaryUrl: { $in: ['', null] } }

// { url: { $regex: new RegExp('324GCn', 'i') }}

// { created: { $lte: ISODate("2022-05-13T17:39:02.109+00:00")}}
// 2022-05-13T17:29:44.468+00:00

var count = 1
db.v1_mdisk_messages.find({ category: '6', imgDriveId: { $in: ['', null] } }).forEach(function (myDoc) {
  const cat = myDoc.category.toString()
  db.v1_mdisk_messages.updateOne(
    { _id: myDoc._id },
    {
      $set: {
        imgDriveId: '1Xy9NTa1eUNQwjfNNl9esmwggOFwEG-qx',
        cloudinaryUrl: 'https://res.cloudinary.com/mdiskapp/image/upload/v1653822398/mdisk1/ein4jrdrd3hnqy44yjbr.jpg'
      }
    }
  )
  console.log('index', count)
  count++
})

db.v1_mdisk_messages.deleteMany({ text: '' })

var count = 1
db.v1_mdisk_messages.find({ category: '6' }).forEach(function (myDoc) {
  if (myDoc.text.length >= 1024) console.log('index', count, '_id', myDoc._id)
  count++
})

// update tasks page size
var count = 1
db.new_tasks
  .find({ botToken: '5171240385:AAHNQb8pmQNYYPzXNRMDclnUyau-ozE2_rQ' })
  .limit()
  .forEach(function (myDoc) {
    const newcategoryState = myDoc.categoryState.map((el) => {
      const newsize = parseInt(myDoc.size) - 20
      const pageSize = Math.max(newsize, 20)
      return {
        ...el,
        size: pageSize.toString()
      }
    })

    db.tasks.updateOne(
      { _id: myDoc._id },
      {
        $set: {
          categoryState: newcategoryState
        }
      }
    )
    console.log('index', count)
    count++
  })

{
  text: {
    $regex: '/oGH2kD'
  }
}

db.chat_join_requests.deleteMany({ token: '5171240385:AAHNQb8pmQNYYPzXNRMDclnUyau-ozE2_rQ' })

db.v1_dood_urls.deleteMany({})

db.new_tasks.updateMany(
  { channelName: 'mallu_bhabhi_aunty' },
  {
    $set: {
      channelName: 'vip_members002'
    }
  }
)

db.gaurav_terabox_messages.updateMany(
  { created: { $gt: ISODate('2023-01-01T16:35:25.678+00:00') } },
  {
    $set: {
      category: '6'
    }
  }
)

db.gaurav_terabox_messages.updateMany(
  { created: { $gt: ISODate('2023-04-02T07:38:08.986+00:00') } },
  {
    $set: {
      imgDriveId: '1zFEBTXx5bfHLRoIdeP7oNK-HCAuiO7GE',
      cloudinaryUrl: 'https://res.cloudinary.com/dwwiwkcfw/image/upload/v1680429900/terabox1/uc_jwnder.jpg'
    }
  }
)

// db.new_tasks.deleteMany({ botToken: "5311112853:AAGoEkdFls2ZZ0pPYuUDmCrWgpcGynlITHM", linkType: "terabox" })

// Mdiskdood
// { botToken: "5311112853:AAGoEkdFls2ZZ0pPYuUDmCrWgpcGynlITHM"}

// Mdiskcoin1new
// { botToken: "5704907153:AAG4vqKygZlmghfM88SP3vdk5MX_Qi58Vpw"}

// Mdiskcoin1new
// {botToken: '5171240385:AAHNQb8pmQNYYPzXNRMDclnUyau-ozE2_rQ'}

const backupMapping = {
  telugu_leakss: 'https://t.me/+zsoZ9cADCfs5Mzhh',
  primexmov: 'https://t.me/+ylZa3CgBw302Zjlh',
  desigangsterss: 'https://t.me/+Xcv_a9zbzo01MDQx',
  vip_members002: 'https://t.me/+qebu0opgM39jNTY5',
  adult_webseries010: 'https://t.me/+Iiq-MfsB98NiYmIx',
  desi_uncut5: 'https://t.me/+Nmjwvv_2MnEzYjlk'
}

var count = 1
db.new_tasks.find({ botToken: '5311112853:AAGoEkdFls2ZZ0pPYuUDmCrWgpcGynlITHM' }).forEach(function (myDoc) {
  db.new_tasks.updateOne(
    { _id: myDoc._id },
    {
      $set: {
        backupChannelLink: backupMapping[myDoc.channelName]
      }
    }
  )
  console.log('index', count)
  count++
})

db.new_tasks.deleteMany({ botToken: '737605638:AAGTr55eNVeq-KycYtOKo5dCLVOJ3IFYBJs' })

db.new_tasks.deleteMany({ botToken: '5311112853:AAGoEkdFls2ZZ0pPYuUDmCrWgpcGynlITHM', linkType: 'vivdisk' })

// { botToken: '5311112853:AAGoEkdFls2ZZ0pPYuUDmCrWgpcGynlITHM', thumbUrl: { $ne: "" }, channelName: 'primexmov'}
const thumbsMapping = {
  telugu_leakss: 'https://drive.google.com/uc?export=view&id=1CfYIcODNcNqxUJbTNoK_JfqIdiFX4Mrx',
  primexmov: 'https://drive.google.com/uc?export=view&id=1weudqL9T2lX7BF-wf2ssOfXSXkLWsL60',
  desigangsterss: 'https://drive.google.com/uc?export=view&id=1jOOhxsE1FdKFkBtv41qpbmF7gXPHt9be',
  vip_members002: 'https://drive.google.com/uc?export=view&id=1CX2XGI_kZjllbjSfNeuHdClp43yWQl2n',
  adult_webseries010: 'https://drive.google.com/uc?export=view&id=1BuBnkES0k-dBUbbzlC7KXAM3bZDFUvIe',
  desi_uncut5: 'https://drive.google.com/uc?export=view&id=16Tx_27gp7PsBR1c795lZ4b0jdsE2jy7F'
}

db.new_tasks.updateMany(
  { botToken: '5311112853:AAGoEkdFls2ZZ0pPYuUDmCrWgpcGynlITHM', thumbUrl: { $ne: "" }, channelName: 'desi_uncut5'},
  {
    $set: {
      thumbUrl: 'https://drive.google.com/uc?export=view&id=16Tx_27gp7PsBR1c795lZ4b0jdsE2jy7F'
    }
  }
)