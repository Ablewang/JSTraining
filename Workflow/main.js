$(function () {
    var tag = $("body").find(".tag");
    tag.mouseenter(function () {
        $(this).children(".span-shut").fadeIn(100);
    })
    tag.mouseleave(function () {
        $(this).children(".span-shut").fadeOut(100);
    })
})

$(document).ready(function () {
    var icon = $(".icon");
    /* ����������ס�¼� */
    icon.bind("mousedown", function (event) {
        var oneself = $(this);
        var FF = oneself.parents(".tag");
        /* ��ȡ��Ҫ�϶��ڵ������ */
        //var offset_x = this.offsetLeft;//x����
        //var offset_y = this.offsetTop;//y����
        var offset_x = FF.position().left;//x����
        var offset_y = FF.position().top//y����
        /* ��ȡ��ǰ�������� */
        var mouse_x = event.pageX;
        var mouse_y = event.pageY;
        /* ���϶��¼� */
        /* �����϶�ʱ�����������Ƴ�Ԫ�أ�����Ӧ��ʹ��ȫ�֣�document��Ԫ�� */
        $(document).bind("mousemove", "oneself", function (ev) {
            /* ��������ƶ��˵�λ�� */
            var _x = ev.pageX - mouse_x;
            var _y = ev.pageY - mouse_y;
            /* �����ƶ����Ԫ������ */
            var now_x = (offset_x + _x) + "px";
            var now_y = (offset_y + _y) + "px";
            /* �ı�Ŀ��Ԫ�ص�λ�� */
            oneself.parent().css({
                top: now_y,
                left: now_x
            });
        });
    });
    /* ���������ɿ����Ӵ��¼��� */
    $(document).bind("mouseup", function () {
        $(this).unbind("mousemove");
    });
})


//�༭
$(function () {
    //��ȡclassΪcaname��Ԫ�� 
    $(".Modify").dblclick(function () {
        var modify = $(this);
        var txt = modify.text();
        var input = $("<input class='modify-inp' type='text'value='" + txt + "'/>");
        modify.html(input);
        input.click(function () { return false; });
        //��ȡ���� 
        input.trigger("focus");
        //�ı���ʧȥ������ύ���ݣ����±�Ϊ�ı� 
        input.blur(function () {
            var newtxt = $(this).val();
            //�ж��ı���û���޸� 
            if (newtxt != txt) {
                modify.html(newtxt);
                /* 
                *����Ҫʹ�����ݿ����ο��Բ���Ҫ 
                var caid = $.trim(modify.prev().text());
                //ajax�첽�������ݿ�,�Ӳ���date�ǽ���������� 
                var url = "../common/Handler2.ashx?caname=" + newtxt + "&caid=" + caid + "&date=" + new Date(); 
                //ʹ��get()������һ��һ�㴦�����data���ܷ��صĲ�������һ�㴦������з��ز����ķ��� context.Response.Write("Ҫ���صĲ���");�� 
                //���ݿ���޸ľ���һ�㴦���������� 
                $.get(url, function(data) { 
                if(data=="1") 
                { 
                alert("������Ѵ��ڣ�"); 
                modify.html(txt);
                return; 
                } 
                alert(data); 
                modify.html(newtxt);
                }); 
                */
            }
            else {
                modify.html(newtxt);
            }
        });
    });
});