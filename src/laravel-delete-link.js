(function ( $ ) {

    $.fn.laravelDeleteLink = function( options ) {

        var settings = $.extend({

        }, $.fn.laravelDeleteLink.defaults, options);

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

                var $formModal = buildForm($deleteLink);
                $('body').append($formModal);
                $formModal.modal();
            });
        });

        function buildForm($deleteLink)
        {
            var modalTitle = 'Do you want to delete this item?';
            if ($deleteLink.data('title')) {
                modalTitle = $deleteLink.data('title');
            }

            var modalContent = 'This action can\'t be reversed!';
            if ($deleteLink.data('content')) {
                modalContent = $deleteLink.data('content');
            }

            var modalConfirmText = 'Delete';
            if ($deleteLink.data('confirm-text')) {
                modalConfirmText = $deleteLink.data('confirm-text');
            }

            var modalConfirmClass = 'btn btn-danger';
            if ($deleteLink.data('confirm-btn-class')) {
                modalConfirmClass = $deleteLink.data('confirm-btn-class');
            }

            var modalCancelText = 'Cancel';
            if ($deleteLink.data('cancel-text')) {
                modalCancelText = $deleteLink.data('cancel-text');
            }

            var modalCancelClass = 'btn btn-warning';
            if ($deleteLink.data('cancel-btn-class')) {
                modalCancelClass = $deleteLink.data('cancel-btn-class');
            }

            var methodSpoof = 'DELETE';
            if ($deleteLink.data('method')) {
                methodSpoof = $deleteLink.data('method');
            }

            var targetUrl = $deleteLink.data('target-url');

            var $csrfField = $('<input/>')
                .attr('name', csrfTokenFieldName)
                .attr('type', 'hidden')
                .attr('value', csrfToken);
            var $methodSpoofField = $('<input/>')
                .attr('name', methodSpoofFieldName)
                .attr('type', 'hidden')
                .attr('value', methodSpoof);

            var $submitButton = $('<button></button>')
                .addClass(modalConfirmClass)
                .attr('type', 'submit')
                .text(modalConfirmText);
            var $cancelButton = $('<button></button>')
                .addClass(modalCancelClass)
                .attr('type', 'button')
                .attr('data-dismiss', 'modal')
                .html($('<strong>' + modalCancelText + '</strong>'));

            var $form = $('<form></form>')
                .attr('action', targetUrl)
                .attr('method', 'post')
                .append($csrfField)
                .append($methodSpoofField)
                .append($cancelButton)
                .append($submitButton);

            return buildModal($form, modalTitle, modalContent);
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
