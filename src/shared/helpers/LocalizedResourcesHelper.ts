﻿import * as rtlDetect from 'rtl-detect';
import * as _ from 'lodash';

export class LocalizedResourcesHelper {

    static loadResources(callback: () => void): void {
        $.when(LocalizedResourcesHelper.loadLocalizedStlyes(), LocalizedResourcesHelper.loadLocalizedScripts()).done(() => {
            callback();
        });
    }

    private static loadLocalizedStlyes(): JQueryPromise<any> {
        var isRtl = rtlDetect.isRtlLang(abp.localization.currentLanguage.name);
        var cssPostfix = "";

        if (isRtl) {
            cssPostfix = "-rtl";
            $('html').attr("dir", "rtl");
        }

        //Bootstrap css
        //   $('head').prepend($('<link rel="stylesheet" type="text/css" />').attr('href', '/assets/metronic/libs/bootstrap/css/bootstrap' + cssPostfix + '.css'));

        //Metronic css fils
        //  $('head').append($('<link rel="stylesheet" type="text/css" />').attr('href', '/assets/metronic/global/css/components-md' + cssPostfix + '.css'));
        //  $('head').append($('<link rel="stylesheet" type="text/css" />').attr('href', '/assets/metronic/global/css/plugins-md' + cssPostfix + '.css'));
        //$('head').append($('<link rel="stylesheet" type="text/css" />').attr('href', '/assets/metronic/admin/layout4/css/layout' + cssPostfix + '.css'));
        // $('head').append($('<link rel="stylesheet" type="text/css" />').attr('href', '/assets/metronic/admin/layout4/css/themes/light' + cssPostfix + '.css'));

        //  $('head').append($('<link rel="stylesheet" type="text/css" />').attr('href', '/assets/common/custom' + cssPostfix + '.css'));
        //  $('head').append($('<link rel="stylesheet" type="text/css" />').attr('href', '/assets/pages/css/login-5' + cssPostfix + '.css'));

        return $.Deferred().resolve();
    }

    private static loadLocalizedScripts(): JQueryPromise<any> {
        if (!abp.session.userId) {
            return $.Deferred().resolve();
        }

        var currentCulture = abp.localization.currentLanguage.name;

        var jTable = "/assets/localization/jtable/jquery.jtable.{0}.js";
        var bootstrapSelect = "/assets/localization/bootstrap-select/defaults-{0}.js";
        var jqueryTimeago = "/assets/localization/jquery-timeago/jquery.timeago.{0}.js";

        return $.when(
            ((currentCulture !== 'en') ? jQuery.getScript(abp.utils.formatString(jTable, currentCulture)) : $.Deferred().resolve()),
            jQuery.getScript(abp.utils.formatString(bootstrapSelect, LocalizedResourcesHelper.findBootstrapSelectLocalization(currentCulture))),
            jQuery.getScript(abp.utils.formatString(jqueryTimeago, currentCulture))
        );
    }

    private static findBootstrapSelectLocalization(currentCulture: string): string {
        var supportedCultures = ["ar_AR",
            "bg_BG",
            "cs_CZ",
            "da_DK",
            "de_DE",
            "en_US",
            "es_CL",
            "eu",
            "fa_IR",
            "fi_FI",
            "fr_FR",
            "hu_HU",
            "id_ID",
            "it_IT",
            "ko_KR",
            "nb_NO",
            "nl_NL",
            "pl_PL",
            "pt_BR",
            "pt_PT",
            "ro_RO",
            "ru_RU",
            "sk_SK",
            "sl_SL",
            "sv_SE",
            "tr_TR",
            "ua_UA",
            "zh_CN",
            "zh_TW"];

        var foundCultures = _.filter(supportedCultures, sc => sc.indexOf(currentCulture) === 0);
        if (foundCultures && foundCultures.length > 0) {
            return foundCultures[0];
        }

        return 'en_US';
    }
}