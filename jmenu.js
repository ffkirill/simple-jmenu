/*
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
 * MA 02110-1301, USA.
 * 
 */


/*
ff.kirill@gmail.com
*/
var jmenu = {
    //first level hover
    hover:function(elem, e) {

        //first, hide all popups
        $("div.popup_menu").hide()

        //move first-level ul's to div
        if  ($(elem).children('ul').eq(0).length > 0 || elem.$div != undefined){

            if (elem.$div == undefined) {
                elem.$div = $('<div class="popup_menu"></div>')
                $("body").append(elem.$div)

                $ul = $(elem).children('ul').eq(0)
                $ul.appendTo(elem.$div)
                if ($(elem).width() > elem.$div.width()) {
                    elem.$div.width($(elem).width())
                }

                //nested ul unhover
                $ul.hover(
                    function(e) {
                    },
                    function(e) {
                        $(this).hide()
                    }
                )

                //nested ul li's hover
                $ul.find('li').each(function() {
                    if ($(this).children('ul').eq(0).length) {
                        $(this).children('a').append("  →")
                    }
                    $(this).hover(
                        function(e) {
                            //nested ul li ul show
                            $(this).children('ul').eq(0).show()
                            $(this).children('ul').eq(0).position({
                                my:        "left top",
                                at:        "right top",
                                offset:    "-10 1",
                                of:        this, // or $("#otherdiv)
                                collision: "fit"
                            })
                        },

                        function(e) {
                            $(this).children('ul').eq(0).hide()
                        }
                    )
                })
            }
            //show div
            elem.$div.children('ul').eq(0).show()
            elem.$div.show()
            if (e.toElement != elem.$div[0]) {
            elem.$div.position({
                    my:        "left top",
                    at:        "left bottom",
                    offset:    "0, 2",
                    of:        elem,
                    collision: "fit"
                })
            }
        }
    },
    //first level unhover
    unhover:function(elem, e) {

        if (elem.$div != undefined) {
            if (e.toElement != elem.$div[0] &&
                elem.$div.find(e.toElement).length == 0 &&
                e.relatedTarget != elem.$div[0] &&
                elem.$div.find(e.relatedTarget).length == 0) {
                elem.$div.hide()
            }
        }
    }
}

jQuery.fn.jmenu = function() {
    $(this).children('ul').find('ul').hide()
    $(this).children('ul').children('li').each(function() {
        if ($(this).children('ul').eq(0).length) {
                //$(this).children('a').append("  ↓")
        }
        $(this).hover(
            function(e) {
                jmenu.hover(this, e);
            }/*,
            function(e) {
                jmenu.unhover(this, e);
            }*/

        );
    });
}

$(document).ready(function() {
    $('#main-menu').jmenu();
});
