(function ( $ ) {

    $.fn.laravelDeleteLink = function( options ) {

        var settings = $.extend({
            
        }, $.fn.positive.defaults, options);

        // Setting some private variables
        var methodSpoofFieldName = '_method';
        var methodSpoof = 'DELETE';
        var csrfTokenFieldName = '_token';
        var csrfToken = $('meta[name="csrf-token"]').attr('content');

        this.each(function() {
            var $deleteLink = $(this);
                 
            // Handling click on the delete button
            $deleteLink.bind('click', function (event) {
                if ($('#deleteConfirmation').length > 0) {
                    $('#deleteConfirmation').remove();
                }
                
                event.preventDefault();
                var targetUrl = $deleteLink.data('target-url');
                var $formModal = buildForm(targetUrl);
                
                $('body').append($formModal);
                $formModal.modal();
            });
        });

        function buildForm(targetUrl)
        {
            
            var $csrfField = $('<input/>')
                            .attr('name', csrfTokenFieldName)
                            .attr('type', 'hidden')
                            .attr('value', csrfToken);
            var $methodSpoofField = $('<input/>')
                            .attr('name', methodSpoofFieldName)
                            .attr('type', 'hidden')
                            .attr('value', methodSpoof);
                    
            var $submitButton = $('<button></button>')
                            .addClass('btn btn-danger')
                            .attr('type', 'submit')
                            .text('Yes, delete');                    
            var $cancelButton = $('<button></button>')
                            .addClass('btn btn-default')
                            .attr('type', 'button')
                            .attr('data-dismiss', 'modal')
                            .text('No, cancel');
                    
            var $form = $('<form></form>')
                            .attr('action', targetUrl)
                            .attr('method', 'post')
                            .append($csrfField)
                            .append($methodSpoofField)
                            .append($cancelButton)
                            .append($submitButton);
            
            var $modal = buildModal($form);
            
            return $modal;
        }
        
        function buildModal($form)
        {
            var $modal = $('\
                <div id="deleteConfirmation" class="modal fade"> \
                    <div class="modal-dialog"> \
                        <div class="modal-content"> \
                            <div class="modal-header"> \
                                <h4>Do you want to delete this item?</h4> \
                            </div> \
                            <div class="modal-body"> \
                                This action can\'t be reversed! \
                            </div> \
                            <div class="modal-footer"></div> \
                        </div> \
                    </div> \
                </div> \
            ');

            $('.modal-footer', $modal).append($form);
            
            return $modal;
        }

        return this;
    };

}( jQuery ));