//callback handler for form submit
$(".tag-form").submit(function(e)
{
    e.preventDefault(); //STOP default action

    var postData = $(this).serializeArray();
    var formURL  = $(this).attr("action");
    var tags     = $(this).children('.input-tags').val()
    var image_id = $(this).attr('data-id');
    $.ajax(
    {
        url : 'images/' + image_id,
        type: "PUT",
        data : postData,
        format: 'js',
        success:function(data, textStatus, jqXHR)
        {
          console.log(data.id);
        },
        error: function(jqXHR, textStatus, errorThrown)
        {
          alert('failed');
        }
    });

    e.unbind(); //unbind. to stop multiple form submit.
});

$( ".tag-form button" ).on( "click", function() {
  $(".tag-form").submit(); //Submit the FORM
});

// $(document).ready ->

//   // $(document).bind "ajaxSuccess", "form.tag-form", (event, xhr, settings) ->
//   //   $tagForm = $(event.data)
//   //   $error_container = $("#error_explanation", $thing_form)
//   //   $error_container_ul = $("ul", $error_container)
//   //   $("<p>").html(xhr.responseJSON.title + " saved.").appendTo $tagForm
//   //   if $("li", $error_container_ul).length
//   //     $("li", $error_container_ul).remove()
//   //     $error_container.hide()

//   // $(document).bind "ajaxError", "form.tag-form", (event, jqxhr, settings, exception) ->
//   //   $tagForm = $(event.data)
//   //   $error_container = $("#error_explanation", $thing_form)
//   //   $error_container_ul = $("ul", $error_container)
//   //   $error_container.show()  if $error_container.is(":hidden")
//   //   $.each jqxhr.responseJSON, (index, message) ->
//   //     $("<li>").html(message).appendTo $error_container_ul

//   $(".").click ->
//     $.ajax({
//       type: "POST",
//       url: "/products",
//       data: { product: { name: "Filip", description: "whatever" } },
//       success:(data) ->
//         alert data.id
//         return false
//       error:(data) ->
//         return false
//     })
