(function ( $ ) {

    $.fn.laravelDeleteLink = function( options ) {

        var settings = $.extend({

        }, $.fn.positive.defaults, options);

        // Setting some private variables
        var methodSpoofFieldName = '_method';
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

                var modalTitle = 'Do you want to delete this item?';
                if ($deleteLink.data('title')) {
                    modalTitle = $deleteLink.data('title');
                }

                var modalContent = 'This action can\'t be reversed!';
                if ($deleteLink.data('content')) {
                    modalContent = $deleteLink.data('content');
                }

                var methodSpoof = 'DELETE';
                if ($deleteLink.data('method')) {
                    methodSpoof = $deleteLink.data('method');
                }

                var targetUrl = $deleteLink.data('target-url');
                var $formModal = buildForm(targetUrl, modalTitle, modalContent, methodSpoof);

                $('body').append($formModal);
                $formModal.modal();
            });
        });

        function buildForm(targetUrl, modalTitle, modalContent, methodSpoof)
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
                .text('Yes');
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

            var $modal = buildModal($form, modalTitle, modalContent);

            return $modal;
        }

        function buildModal($form, title, content)
        {
            var $modal = $('\
                <div id="deleteConfirmation" class="modal fade"> \
                    <div class="modal-dialog"> \
                        <div class="modal-content"> \
                            <div class="modal-header"> \
                                <h4>' + title + '</h4> \
                            </div> \
                            <div class="modal-body"> \
                                ' + content + ' \
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