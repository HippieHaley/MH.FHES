<!DOCTYPE html PUBLIC>
<html>
<head><link rel="stylesheet" type="text/css" href="styles/defran.css" /><link rel="stylesheet" type="text/css" href="styles/rpt.css" />
    <script language="javascript" type="text/javascript" src="scripts3p/jquery-2.1.0.min.js"></script>
    <script language="javascript" type="text/javascript" src="scripts/Reports/reports_client_functions.js"></script>
    <script type="text/javascript" language="javaScript" src="scripts/json2.js"></script> 
    <script type='text/javascript' language="javaScript" src='scripts/Util.js'></script>
    <script type="text/javascript" language="javaScript" src="scripts/RadUtil.js"></script>

    <style type="text/css">
        table, html, body
        {
            margin: 0px;
            border: 0px;
            padding: 0px;
        }
        @media print
        {    
            .noprint
            {
                display: none !important;
            }
        }
    </style>
    <title>
	Patient Statement
</title>

    <script type="text/javascript" FOR="window" EVENT="onload">
        var printEnabled = true;
    </script>

    <script type="text/javascript">
        //ZV ECS-38972 4/7/2020 Fix closing report from reports module + front desk.
        /**
         * Attempt to close with rad window, if that fails then do generic close.
         */
        function closeReport() {
            try {
                getRadWindow().close();
            }
            catch (e) {
                window.close();
            }
        }
        // BrettM ECS-12166 5/24/2017 Added function for saving reports as pdf. 
        function pdfReport(){
            /// <summary>Function for calling the web method on server side that produces the PDF for saving or printing.</summary>
            /// <field name='pdfUrl' type='string'>The url to the webmethod on server side</field>
            var pdfUrl = "abcpdf_print_reports.aspx/generatePDF";      
            
            
            
            // Disables the toolbar and scrollbar so when we print the PDF, they are not included. 
            $('.noprint').css('display', 'none');
            var d = document.documentElement;
            d.style.overflowY = "hidden";

            //varible to pass to web method to determine if page is in landscape format
            var landscape = false;

            // Ajax call to the webmethod. On success, we redirect to the pdf_save_dialog page to present the user with the save/open option dialog. 
            $.ajax({
                url: pdfUrl,
                async: false,
                type:JSON,
                contentType: "application/json;charset=utf-8",
                data: JSON.stringify({"data": d.outerHTML, "landscape": landscape}),
                dataType: "json",
                type: "POST",
                success: function(data){
                    window.location = data.d;
                }
            });
            // Enables the toolbar and scroll bar after the PDF has been created. 
            $('.noprint').css('display', 'block');
            d.style.overflowY = "auto";
        }

        // AMASLAR 11/19/2019 ECS-38006 - Patient Statement Report launched from Front Desk check in - Close button doesn't close
        /**
         * Closes the patient statement as independent page or popup.
         */
        function closePatientStatement() {

            var handle = getRadWindow();
            if (typeof handle !== "undefined" && handle !== null) {
                try {
                    setTimeout(function () { handle.close(false); }, 10);
                } catch (eeks) { }
            } else {
                window.close();
            }
        }

        function printReport() {
            

            with (document) {
                var bar = "tool_bar";
                var rpt = "report_details";
                var sTitle = title;


                //Hide Title
                title = "";

                //Hide buttons
                //		all(bar).style.visibility='hidden';

                //Hide scrollbars
                body.style.overflowX = "hidden";
                body.style.overflowY = "hidden";
                //all(rpt).style.media = "print";
                //all(rpt).style.overflowX = "hidden";
                //all(rpt).style.overflowY = "hidden";
                
                    window.print();

                //Restore visibility
                title = sTitle;

                //		all(bar).style.visibility='visible';

                body.style.overflowX = "auto";
                body.style.overflowY = "auto";
                //all(rpt).style.overflowX = "auto";
                //all(rpt).style.overflowY = "auto";

            }
        }
    </script>
</head>

<body>

	<table  class="noprint" width="100%" cellpadding="0" cellspacing="0">
		<tr>
			<td id="print_button" align="left" valign="top" style="padding-top:2px; padding-left:2px; padding-right:2px" class="tool_button_out" onmouseover="this.className='tool_button_over'" onmouseout="this.className='tool_button_out'" title="Print Report" onClick="printReport();">
				<nobr><img src="images/PrintHS.png" border="0" WIDTH="16" HEIGHT="16">
				<span style="vertical-align:top"> Print</span></nobr></td>
			<td align="left" id="close_button" style="padding-top:2px; padding-left:2px; padding-right:2px" class="tool_button_out" onmouseover="this.className='tool_button_over'" onmouseout="this.className='tool_button_out'" title="Close this Form" onClick="closeReport();"><nobr>
				<img src="images/close.png" border="0" WIDTH="18" HEIGHT="17">
				<span style="vertical-align:top"> Close</span></nobr></td>
			<td width="99%" style="background-color: gainsboro;">&nbsp;</td>
		</tr>
	</table>


                <table cellpadding="0" cellspacing="0">
                    <colgroup>
                        <col width="13%" />
                        <col width="9%" />
                        <col width="13%" />
                        <col width="4%" />
                        <col width="6%" />
                        <col width="6%" />
                        <col width="7%" />
                        <col width="7%" />
                        <col width="7%" />
                        <col width="7%" />
                        <col width="7%" />
                        <col width="7%" />
                        <col width="7%" />
                    </colgroup>
                    
                    <tr>                
                        <td colspan="6" align="left" valign="top" class="report_text" width="10%">
                        
                            <img src="DisplayImage.aspx?id=46e8ab85-df04-43eb-9274-f3638d2027a9" height="100px"/>
                            
                        
                        </td>
                        
                        <td colspan="8" valign="top" align="left" style="border: 1px solid black" rowspan="4">
                            <table cellspacing="5px">
                                <tr>
                                    <td>Client Name(s):</td>
				                    <td>
Hale, Savannah (00036212)

                                    </td>
                                </tr>                                                                                                
                                
                                    
                                                                                                                                 
                                    <tr><td>Payment Type:</td><td>( Cash &#9744; / Check &#9744; / CC &#9744;)</td></tr>
                                    
                                    <tr><td>Card Type:</td><td>( Visa &#9744; / MC &#9744; / American Exp &#9744; / Discover &#9744; )</td></tr> 

                                    <tr><td>Name on Card:</td><td>_______________________________________</td></tr> 

                                    <tr><td>Card Number:</td><td>_______________________________________</td></tr>

                                    <tr>
                                        <td>Expiration Date:</td><td> ___/___/_____   Security Code: ___________</td>
                                    </tr>
                                    
                                    <tr><td>Amount Enclosed:</td><td>___________</td></tr>

                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4" style="font-size: 12pt;">
                            Statement Date:   3/13/2025
                        </td>
                    </tr>
                    <tr>
                        <td colspan="5" >
                            <div style="border: 1px solid black; float: left;">
                                   <b style="font-size: 12pt;">PAY THIS AMOUNT:  </b><b style="text-decoration: underline; font-size: 12pt;">$94.00</b></div>
                            
                        </td>
                    </tr>

                    <tr>
                    <td><br /></td>
                    </tr>
                    
                    <tr>
                    <td><br /></td>
                    </tr>
                    
                    <tr>
                    <td><br /></td>
                    </tr>

                    <tr>
                        <td colspan="4" style="font-size: 12pt;">
                            Hale, Savannah
                        </td>
                        <td colspan="3"></td>
                        <td colspan="7" style="font-size: 12pt;">
                            
                        </td>

                    </tr>
                    <tr>
                        <td colspan="4" style="font-size: 12pt;">
                            4840 Shelby Ave. B201
                            <br/> 
                            
                        </td>
                        <td colspan="3"></td>
                        <td colspan="7" style="font-size: 12pt;">
                            Family Health Education Services
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4" style="font-size: 12pt;">
                            RAPID CITY, SD 57700
                        </td>
                        <td colspan="3"></td>
                        <td colspan="7" style="font-size: 12pt;">
                            930 North 10th St
                        </td>
                    </tr>
                    <tr>
                        <td colspan="7" style="font-size: 12pt;">
                        </td>
                        <td colspan="7" style="font-size: 12pt;">
                            SPEARFISH, SD 57783
                        </td>
                    </tr>

                    <tr>
                    <td><br /></td>
                    </tr>
                    <tr>
                    <td><br /></td>
                    </tr>
                    <tr>
                    <td><br /></td>
                    </tr>


                    <tr>
                    <td colspan="14" style="border-top: 2px dashed black">&nbsp;</td>
                    </tr>

                    <tr>
                        <td><br /></td>
                    </tr>

                    <tr>
                        <td colspan="2">
                        Client ID: 00036212
                        </td>
                        <td colspan="12">
                        Client Name:                                     
Hale, Savannah (00036212)

                        </td>
                    </tr>

                    <tr>
                    <td><br /><br /></td>
                    </tr>


                    <tr style="padding: 5px; vertical-align: text-bottom;">
                        <td style="border-bottom: 3px solid black; text-align:left">Claim<br />Number</td>
                        <td style="border-bottom: 3px solid black; text-align:left">Service<br />Date(s)</td>
                        <td style="border-bottom: 3px solid black; text-align:left">Procedure</td>
                        <td style="border-bottom: 3px solid black; text-align:center">Units</td>
                        <td style="border-bottom: 3px solid black; text-align:right">Unit<br />Rate</td>
                        <td style="border-bottom: 3px solid black; text-align:right">Total<br />Charge</td>
                        <td style="border-bottom: 3px solid black; text-align:right">Patient<br />Charge</td>
                        <td style="border-bottom: 3px solid black; text-align:right">Total<br />Paid</td>
                        <td style="border-bottom: 3px solid black; text-align:right">Ins.<br />Paid</td>
                        <td style="border-bottom: 3px solid black; text-align:right">Patient<br />Paid</td>
                        <td style="border-bottom: 3px solid black; text-align:right">Total<br />Adj.</td>
                        <td style="border-bottom: 3px solid black; text-align:right">Total<br />Balance</td>
                        <td style="border-bottom: 3px solid black; text-align:right">Ins.<br />Balance</td>
                        <td style="border-bottom: 3px solid black; text-align:right">Patient<br />Balance</td>
                    </tr>

                    <tr style="
                                                    
                    ">
                        <td style="padding-bottom: 5px; padding-top: 5px; padding-left: 5px; border-left: 1px solid black; border-top: 1px solid black;text-align:left">
                            105692-CL-00006 
                        </td>
                        <td style="padding: 5px; border-top: 1px solid black; text-align:left">10/02/2024</td>
                        <td style="padding: 5px; border-top: 1px solid black; text-align:left">99395-Preventative 18-39 Established</td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; border-left: 1px solid black; text-align:center">7</td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right">$267.00</td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right">$376.00</td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right">$94.00</td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right">$0.00</td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right">$0.00</td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right">$0.00</td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right">$0.00</td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right">$94.00</td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right">$282.00</td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right">$94.00</td>
                    </tr>

                    <tr style="
                        font-style: italic;                            
                    ">
                        <td style="padding-bottom: 5px; padding-top: 5px; padding-left: 5px; border-left: 1px solid black; border-top: 1px solid black;text-align:left">
                            &nbsp;&nbsp;&nbsp;Service Line# 1 
                        </td>
                        <td style="padding: 5px; border-top: 1px solid black; text-align:left">10/02/2024</td>
                        <td style="padding: 5px; border-top: 1px solid black; text-align:left">99395-Preventative 18-39 Established</td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; border-left: 1px solid black; text-align:center">1</td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right">$267.00</td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right">$267.00</td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right"></td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right"></td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right"></td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right"></td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right">$0.00</td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right"></td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right"></td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right"></td>
                    </tr>

                    <tr style="
                        font-style: italic;                            
                    ">
                        <td style="padding-bottom: 5px; padding-top: 5px; padding-left: 5px; border-left: 1px solid black; border-top: 1px solid black;text-align:left">
                            &nbsp;&nbsp;&nbsp;Service Line# 2 
                        </td>
                        <td style="padding: 5px; border-top: 1px solid black; text-align:left">10/02/2024</td>
                        <td style="padding: 5px; border-top: 1px solid black; text-align:left">88142-Pap Liquid Base</td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; border-left: 1px solid black; text-align:center">1</td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right">$30.00</td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right">$30.00</td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right"></td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right"></td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right"></td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right"></td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right">$0.00</td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right"></td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right"></td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right"></td>
                    </tr>

                    <tr style="
                        font-style: italic;                            
                    ">
                        <td style="padding-bottom: 5px; padding-top: 5px; padding-left: 5px; border-left: 1px solid black; border-top: 1px solid black;text-align:left">
                            &nbsp;&nbsp;&nbsp;Service Line# 3 
                        </td>
                        <td style="padding: 5px; border-top: 1px solid black; text-align:left">10/02/2024</td>
                        <td style="padding: 5px; border-top: 1px solid black; text-align:left">87389-HIV Serum</td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; border-left: 1px solid black; text-align:center">1</td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right">$22.00</td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right">$22.00</td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right"></td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right"></td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right"></td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right"></td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right">$0.00</td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right"></td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right"></td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right"></td>
                    </tr>

                    <tr style="
                        font-style: italic;                            
                    ">
                        <td style="padding-bottom: 5px; padding-top: 5px; padding-left: 5px; border-left: 1px solid black; border-top: 1px solid black;text-align:left">
                            &nbsp;&nbsp;&nbsp;Service Line# 4 
                        </td>
                        <td style="padding: 5px; border-top: 1px solid black; text-align:left">10/02/2024</td>
                        <td style="padding: 5px; border-top: 1px solid black; text-align:left">86592-PRP Qualatative</td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; border-left: 1px solid black; text-align:center">1</td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right">$20.00</td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right">$20.00</td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right"></td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right"></td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right"></td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right"></td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right">$0.00</td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right"></td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right"></td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right"></td>
                    </tr>

                    <tr style="
                        font-style: italic;                            
                    ">
                        <td style="padding-bottom: 5px; padding-top: 5px; padding-left: 5px; border-left: 1px solid black; border-top: 1px solid black;text-align:left">
                            &nbsp;&nbsp;&nbsp;Service Line# 5 
                        </td>
                        <td style="padding: 5px; border-top: 1px solid black; text-align:left">10/02/2024</td>
                        <td style="padding: 5px; border-top: 1px solid black; text-align:left">87491-Chlamydia</td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; border-left: 1px solid black; text-align:center">1</td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right">$15.00</td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right">$15.00</td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right"></td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right"></td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right"></td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right"></td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right">$0.00</td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right"></td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right"></td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right"></td>
                    </tr>

                    <tr style="
                        font-style: italic;                            
                    ">
                        <td style="padding-bottom: 5px; padding-top: 5px; padding-left: 5px; border-left: 1px solid black; border-top: 1px solid black;text-align:left">
                            &nbsp;&nbsp;&nbsp;Service Line# 6 
                        </td>
                        <td style="padding: 5px; border-top: 1px solid black; text-align:left">10/02/2024</td>
                        <td style="padding: 5px; border-top: 1px solid black; text-align:left">87591-Gonorrhea</td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; border-left: 1px solid black; text-align:center">1</td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right">$15.00</td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right">$15.00</td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right"></td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right"></td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right"></td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right"></td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right">$0.00</td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right"></td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right"></td>
                        <td style="padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right"></td>
                    </tr>

                    <tr style="
                        font-style: italic;                            
                    ">
                        <td style="border-bottom: 1px solid black;padding-bottom: 5px; padding-top: 5px; padding-left: 5px; border-left: 1px solid black; border-top: 1px solid black;text-align:left">
                            &nbsp;&nbsp;&nbsp;Service Line# 7 
                        </td>
                        <td style="border-bottom: 1px solid black;padding: 5px; border-top: 1px solid black; text-align:left">10/02/2024</td>
                        <td style="border-bottom: 1px solid black;padding: 5px; border-top: 1px solid black; text-align:left">36415-Venipuncture</td>
                        <td style="border-bottom: 1px solid black;padding: 5px; border-top: 1px solid black; border-right: 1px solid black; border-left: 1px solid black; text-align:center">1</td>
                        <td style="border-bottom: 1px solid black;padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right">$7.00</td>
                        <td style="border-bottom: 1px solid black;padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right">$7.00</td>
                        <td style="border-bottom: 1px solid black;padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right"></td>
                        <td style="border-bottom: 1px solid black;padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right"></td>
                        <td style="border-bottom: 1px solid black;padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right"></td>
                        <td style="border-bottom: 1px solid black;padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right"></td>
                        <td style="border-bottom: 1px solid black;padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right">$0.00</td>
                        <td style="border-bottom: 1px solid black;padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right"></td>
                        <td style="border-bottom: 1px solid black;padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right"></td>
                        <td style="border-bottom: 1px solid black;padding: 5px; border-top: 1px solid black; border-right: 1px solid black; text-align:right"></td>
                    </tr>

                    <tr>
                    <td><br /><br /></td>
                    </tr>
                    <!-- BH ECS-16765 3/31/2017 Adding the cash_log rows that don't have a remittance -->
                    <tr>
                        <td colspan="11"></td>
                        <td colspan="2" style="border-top: 3px solid black; text-align:left">Patient's Unapplied Balance</td>
                        <td colspan="1" style="padding: 5px; border: 3px solid black; text-align:right">$0.00</td>
                    </tr>

                    <tr>
                    <td><br /><br /></td>
                    </tr>
                    <tr>
                        <td colspan="3"></td>
                        <td colspan="2" style="border-top: 3px solid black; text-align:left">Totals</td>
                        <td colspan="1" style="padding: 5px; border-left: 1px solid black; border-bottom: 1px solid black;border-top: 3px solid black; text-align:right">$376.00</td>
                        <td colspan="1" style="padding: 5px; border-left: 1px solid black; border-bottom: 1px solid black;border-top: 3px solid black; text-align:right">$94.00</td>
                        <td colspan="1" style="padding: 5px; border-left: 1px solid black; border-bottom: 1px solid black;border-top: 3px solid black; text-align:right">$0.00</td>
                        <td colspan="1" style="padding: 5px; border-left: 1px solid black; border-bottom: 1px solid black;border-top: 3px solid black; text-align:right">$0.00</td>
                        <td colspan="1" style="padding: 5px; border-left: 1px solid black; border-bottom: 1px solid black;border-top: 3px solid black; text-align:right">$0.00</td>
                        <td colspan="1" style="padding: 5px; border-left: 1px solid black; border-bottom: 1px solid black;border-top: 3px solid black; text-align:right">$0.00</td>
                        <td colspan="1" style="padding: 5px; border-left: 1px solid black; border-bottom: 1px solid black;border-top: 3px solid black; text-align:right">$94.00</td>
                        <td colspan="1" style="padding: 5px; border-left: 1px solid black; border-bottom: 1px solid black;border-top: 3px solid black; text-align:right">$282.00</td>
                        <td colspan="1" style="padding: 5px; border: 3px solid black; text-align:right">$94.00</td>
                    </tr>

                    <tr>
                    <td><br /><br /></td>
                    </tr>

                    <tr>
                        <td colspan="6" style="border: 1px solid black; text-align: left;">Balances:</td>
                        <td colspan="2" style="border: 1px solid black; text-align: center;">&nbsp;0 - 30</td>
                        <td colspan="2" style="border: 1px solid black; text-align: center;">&nbsp;31 - 60</td>
                        <td colspan="2" style="border: 1px solid black; text-align: center;">&nbsp;61 - 90</td>
                        <td colspan="2" style="border: 1px solid black; text-align: center;">&nbsp;Over 90</td>
                    </tr>
                    <tr>
                        <td colspan="6" style="text-align: left; border: 1px solid black">Total All Other Payers:</td>
                        <td colspan="2" style="text-align: right; border: 1px solid black">&nbsp;</td>
                        <td colspan="2" style="text-align: right; border: 1px solid black">&nbsp;</td>
                        <td colspan="2" style="text-align: right; border: 1px solid black">&nbsp;</td>
                        <td colspan="2" style="text-align: right; border: 1px solid black">&nbsp;$0.00</td>
                    </tr>
                    <tr>
                        <td colspan="6" style="text-align: left; border: 1px solid black">Patient:</td>
                        <td colspan="2" style="text-align: right; border: 1px solid black">&nbsp;</td>
                        <td colspan="2" style="text-align: right; border: 1px solid black">&nbsp;</td>
                        <td colspan="2" style="text-align: right; border: 1px solid black">&nbsp;</td>
                        <td colspan="2" style="text-align: right; border: 1px solid black">&nbsp;$94.00</td>
                    </tr>

                    <tr>
                        <td colspan="14" align="center"><!-- MartinW 09/23/2023 ECS-57866 allow for custom footer -->
                            <br /><br />Disclaimer: Charges/Adjustments made after statement date will appear on your next statement.  Questions: Please call (605)773-6031
                        </td>
                    </tr>

                </table>

          

    
</body>
</html>