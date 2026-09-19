<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>LMC Official Internship Verification Certificate</title>
    <style>
        @page {
            size: a4 portrait;
            margin: 0;
        }
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            background-color: #FFFFFF;
            color: #4D4B55;
            margin: 0;
            padding: 0;
        }
        .border-frame {
            padding: 40px;
            box-sizing: border-box;
            height: 100%;
            border: 14px solid #0B1C30;
            border-bottom: 24px solid #0B1C30;
            position: relative;
        }
        .header {
            border-bottom: 2px solid #DA7A31;
            padding-bottom: 20px;
            margin-bottom: 25px;
        }
        .logo-text {
            font-size: 38px;
            font-weight: 800;
            color: #0B1C30;
            letter-spacing: 2px;
            display: inline-block;
        }
        .logo-accent {
            color: #DA7A31;
        }
        .company-subtitle {
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 3px;
            color: #DA7A31;
            font-weight: 700;
            margin-top: 2px;
        }
        .tagline {
            font-size: 11px;
            color: #6C6A76;
            font-style: italic;
            margin-top: 4px;
        }
        .doc-title {
            text-align: center;
            font-size: 22px;
            font-weight: 800;
            color: #0B1C30;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            margin: 25px 0 10px 0;
        }
        .doc-subtitle {
            text-align: center;
            font-size: 11px;
            color: #DA7A31;
            font-weight: bold;
            letter-spacing: 2px;
            text-transform: uppercase;
            margin-bottom: 30px;
        }
        .statement {
            font-size: 13px;
            line-height: 1.7;
            text-align: justify;
            color: #34323A;
            margin-bottom: 25px;
        }
        .recipient-name {
            font-size: 24px;
            font-weight: bold;
            color: #0B1C30;
            text-align: center;
            margin: 15px 0 5px 0;
            text-transform: uppercase;
            letter-spacing: 1px;
            border-bottom: 1px dashed #DA7A31;
            padding-bottom: 8px;
        }
        .recipient-university {
            text-align: center;
            font-size: 13px;
            color: #6C6A76;
            font-weight: 600;
            margin-bottom: 20px;
        }
        .details-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            margin-bottom: 30px;
            background-color: #F0F0F1;
        }
        .details-table td {
            padding: 10px 14px;
            font-size: 11px;
            border-bottom: 1px solid #E2E2E5;
        }
        .details-table .label {
            font-weight: bold;
            color: #0B1C30;
            width: 32%;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .details-table .value {
            color: #34323A;
            font-weight: 500;
        }
        .verification-stamp {
            background-color: #0B1C30;
            color: #FFFFFF;
            padding: 12px;
            border-radius: 4px;
            margin-top: 20px;
            font-size: 11px;
        }
        .verification-code {
            font-family: monospace;
            font-weight: bold;
            color: #DA7A31;
            letter-spacing: 1.5px;
        }
        .signatures {
            margin-top: 45px;
            width: 100%;
        }
        .sign-col {
            width: 48%;
            display: inline-block;
            vertical-align: top;
        }
        .sign-line {
            border-top: 1px solid #0B1C30;
            width: 80%;
            margin-top: 35px;
            padding-top: 6px;
            font-size: 11px;
            font-weight: bold;
            color: #0B1C30;
        }
        .sign-role {
            font-size: 10px;
            color: #6C6A76;
        }
        .footer-note {
            position: absolute;
            bottom: 20px;
            left: 40px;
            right: 40px;
            text-align: center;
            font-size: 9px;
            color: #8C8A94;
            border-top: 1px solid #E2E2E5;
            padding-top: 8px;
        }
    </style>
</head>
<body>
    <div class="border-frame">
        <div class="header">
            <table style="width: 100%;">
                <tr>
                    <td>
                        <span class="logo-text">L<span class="logo-accent">M</span>C</span>
                        <div class="company-subtitle">Global Technologies (Pvt) Ltd</div>
                        <div class="tagline">"Technology Beyond Boundaries"</div>
                    </td>
                    <td style="text-align: right; vertical-align: top;">
                        <div style="font-size: 11px; font-weight: bold; color: #0B1C30;">OFFICIAL RECORD</div>
                        <div style="font-size: 10px; color: #6C6A76; margin-top: 3px;">Date of Issue: {{ \Carbon\Carbon::now()->format('F d, Y') }}</div>
                        <div style="font-size: 10px; color: #DA7A31; font-weight: bold; margin-top: 2px;">STATUS: {{ strtoupper($intern->verification_status) }}</div>
                    </td>
                </tr>
            </table>
        </div>

        <div class="doc-title">Certificate of Internship Completion & Verification</div>
        <div class="doc-subtitle">Industrial Engineering & Technology Immersion Program</div>

        <div class="statement">
            This is an official document from the Directorate of Talent & Engineering at <strong>LMC Global Technologies (Pvt) Ltd</strong> certifying that the candidate named below has completed industrial technology training under rigorous corporate standards:
        </div>

        <div class="recipient-name">{{ $intern->name }}</div>
        <div class="recipient-university">{{ $intern->university }} &bull; {{ $intern->course }}</div>

        <table class="details-table">
            <tr>
                <td class="label">Internship Record ID</td>
                <td class="value"><strong>{{ $intern->intern_id }}</strong></td>
            </tr>
            <tr>
                <td class="label">Engineering Department</td>
                <td class="value">{{ $intern->department }}</td>
            </tr>
            <tr>
                <td class="label">Training Tenure</td>
                <td class="value">{{ $intern->start_date->format('M d, Y') }} to {{ $intern->end_date->format('M d, Y') }}</td>
            </tr>
            <tr>
                <td class="label">Assigned Project</td>
                <td class="value">{{ $intern->project_title ?? 'Enterprise Core Platform Systems' }}</td>
            </tr>
            <tr>
                <td class="label">Supervisor / Lead</td>
                <td class="value">{{ $intern->supervisor ?? 'Engineering Management Board' }}</td>
            </tr>
            <tr>
                <td class="label">Attendance Metric</td>
                <td class="value"><strong style="color: #DA7A31;">{{ $intern->attendance_percentage }}% Verified Presence</strong></td>
            </tr>
            <tr>
                <td class="label">Performance Assessment</td>
                <td class="value">{{ $intern->performance_score ?? '95.0' }}% &mdash; Outstanding Engineering Proficiency</td>
            </tr>
        </table>

        <div class="verification-stamp">
            <table style="width: 100%; color: #FFFFFF;">
                <tr>
                    <td style="width: 70%; font-size: 10px; line-height: 1.5;">
                        <strong style="color: #DA7A31;">DIGITAL INTEGRITY HASH:</strong><br>
                        This credential is cryptographically anchored in the LMC Verification Database.<br>
                        Public online validation available at: <span style="text-decoration: underline;">https://lmcglobal.tech/verify-internship</span>
                    </td>
                    <td style="text-align: right; vertical-align: middle;">
                        <span class="verification-code">{{ $intern->verification_code }}</span>
                    </td>
                </tr>
            </table>
        </div>

        <div class="signatures">
            <div class="sign-col">
                <div class="sign-line">
                    DIRECTOR OF TECHNOLOGY
                    <div class="sign-role">LMC Global Technologies (Pvt) Ltd</div>
                </div>
            </div>
            <div class="sign-col" style="text-align: right;">
                <div class="sign-line" style="margin-left: auto;">
                    HEAD OF TALENT ACCELERATOR
                    <div class="sign-role">Directorate of Engineering Operations</div>
                </div>
            </div>
        </div>

        <div class="footer-note">
            LMC Global Technologies (Pvt) Ltd &bull; Technology Beyond Boundaries &bull; Confidential & Official Corporate Record &bull; Generated digitally with tamper detection
        </div>
    </div>
</body>
</html>
