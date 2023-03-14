$('.tabs-item').click(function(e){
    e.preventDefault();

    $('.tabs-item').removeClass('tabs-item_active');
    $('.tabs-block').removeClass('tabs-block_active');

    $(this).addClass('tabs-item_active');
    $($(this).attr('href')).addClass('tabs-block_active');
});

var elems=document.getElementsByClassName('tabs-block');
if(elems.length > 0){
    for(var i=0; i<elems.length; i++)elems[i].style.display='none';
    var elems=document.getElementsByClassName('tabs-block_active');
    for(var i=0; i<elems.length; i++)elems[i].style.display='block';
}

//! не работающие табы на чистом js
/*     document.querySelectorAll('.tabs-item').forEach((item) =>               
    item.addEventListener('click',function(e){
        e.preventDefault();
        const id = e.target.getAttribute('href').replace('#', '');

        document.querySelectorAll('.tabs-item').forEach(
            (child) => child.classList.remove('tabs-item_active')
        );
        document.querySelectorAll('.tabs-block').forEach(
            (child) => child.classList.remove('tabs-block_active')
        );

        item.classList.add('tabs-item_active');
        document.getElementById(id).classList.add('tabs-block_active');
    })
); */