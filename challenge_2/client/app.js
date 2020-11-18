
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
        alert ('success')
        console.log(text)
      }
    })
  })

