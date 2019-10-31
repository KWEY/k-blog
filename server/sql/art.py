def index(request):
    # latest_question_list = Article.objects.order_by('id')[:5]
    typeToId = {
        '001_001': 1001,
        '001_002': 1002,
        '001_003': 1003,
        '001_004': 1004,
        '001_006': 1006,
        '001_011': 1011,
        '001_012': 1012,
        '001_013': 1013,
        '001_015': 1015,
        '001_016': 1016,
        '001_017': 1017,
        '001_014': 1014,
        '001_110': 1110
    }
    data = []
    with open('./art.json') as f:
        js = json.load(f)  # js是转换后的字典
        for item in js:

            type = 1001
            views = 0
            created_at = None
            updated_at = None
            aid = 1
            title = ''
            description = ''
            content = ''
            for i in item:
                if i == 'type':
                    type = typeToId[item[i][0]]
                if i == 'id':
                    aid = item[i]
                if i == 'views':
                    views = item[i]
                if i == 'created_at':
                    created_at = datetime.fromtimestamp((item[i]/1000))
                if i == 'updated_at':
                    print(item[i])
                    if item[i]:
                        print(item[i], 'asdasd')
                        updated_at = datetime.fromtimestamp((item[i]/1000))
                if i == 'title':
                    title = item[i]
                if i == 'description':
                    description = item[i]
                if i == 'content':
                    content = item[i]
                
            data.append(Article(
                    author_id=1,
                    aid=aid,
                    type=type,
                    views=views,
                    updated_at=updated_at,
                    created_at=created_at,
                    title=title,
                    description=description,
                    content=content,
                ))

            print(data.__len__())

    Article.objects.bulk_create(data,5) 

    # list = Article.objects.values()
    # for j in list:
    #     print(j)
    #     pass
    return HttpResponse('list')