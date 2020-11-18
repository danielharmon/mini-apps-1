
  $('#form').on('submit', function(e) {
    console.log('clicked')
    e.preventDefault();

    var data = new FormData($(this)[0])
    $.ajax({
      url: 'http://localhost:8080/uploads',
      method: 'POST',
      enctype: 'multipart/form-data',
      data: data,
      contentType: false,
      processData: false,
      success: function(text) {
        console.log($('.data'))
        $('.data').text(text)
        var file = new Blob([text], {type: 'text/plain'})
        $('a').attr('href', URL.createObjectURL(file))
        $('a').attr('download', 'CSV.txt')
      }
    })
  })

