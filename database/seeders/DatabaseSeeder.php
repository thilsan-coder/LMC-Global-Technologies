<?php

namespace Database\Seeders;

use App\Models\Attendance;
use App\Models\ContactMessage;
use App\Models\Customer;
use App\Models\FollowUp;
use App\Models\Intern;
use App\Models\Lead;
use App\Models\Product;
use App\Models\Review;
use App\Models\Service;
use App\Models\Task;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Roles & Permissions Setup
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        $permissions = [
            'view users',
            'create users',
            'edit users',
            'delete users',
            'view customers',
            'manage customers',
            'manage leads',
            'manage internships',
            'manage attendance',
            'manage reviews',
            'approve reviews',
            'manage products',
            'manage services',
            'view contact messages',
        ];

        foreach ($permissions as $perm) {
            Permission::firstOrCreate(['name' => $perm]);
        }

        $adminRole = Role::firstOrCreate(['name' => 'Admin']);
        $adminRole->syncPermissions(Permission::all());

        $staffRole = Role::firstOrCreate(['name' => 'Staff']);
        $staffRole->syncPermissions([
            'view customers',
            'manage customers',
            'manage leads',
            'manage internships',
            'manage attendance',
            'manage products',
            'manage services',
            'view contact messages',
        ]);

        $internRole = Role::firstOrCreate(['name' => 'Intern']);

        // 2. Users Setup
        $admin = User::firstOrCreate(
            ['email' => 'admin@lmcglobal.tech'],
            [
                'name' => 'LMC Chief Administrator',
                'phone' => '+94 11 234 5678',
                'designation' => 'Director of Technology',
                'password' => Hash::make('password'),
                'is_active' => true,
            ]
        );
        $admin->syncRoles(['Admin']);

        $staff = User::firstOrCreate(
            ['email' => 'staff@lmcglobal.tech'],
            [
                'name' => 'Elena Jayawardena',
                'phone' => '+94 77 123 4567',
                'designation' => 'Senior Project Lead & CRM Specialist',
                'password' => Hash::make('password'),
                'is_active' => true,
            ]
        );
        $staff->syncRoles(['Staff']);

        $internUser = User::firstOrCreate(
            ['email' => 'intern@lmcglobal.tech'],
            [
                'name' => 'Nimesh Fernando',
                'phone' => '+94 71 987 6543',
                'designation' => 'Software Engineering Intern',
                'password' => Hash::make('password'),
                'is_active' => true,
            ]
        );
        $internUser->syncRoles(['Intern']);

        // 3. Services Setup
        $services = [
            [
                'name' => 'Web Application Development',
                'slug' => 'web-application-development',
                'summary' => 'Architecting resilient, high-throughput cloud web platforms built on modern microservices and reactive interfaces.',
                'description' => 'We design and engineer mission-critical enterprise web solutions with maximum performance, fault-tolerance, and rigorous security standards. Our full-stack engineering practices encompass Laravel, React, Next.js, distributed databases, and CI/CD pipelines.',
                'features' => ['Custom Enterprise Portals', 'Cloud-Native Distributed Backends', 'Headless CMS & API Integration', 'Sub-second Latency Optimization', 'Comprehensive Automated Testing Suites'],
                'technologies' => ['Laravel', 'React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Redis', 'Docker'],
                'icon' => 'Globe',
                'status' => 'Active',
                'display_order' => 1,
            ],
            [
                'name' => 'Mobile Application Development',
                'slug' => 'mobile-application-development',
                'summary' => 'Native and cross-platform mobile solutions engineered for seamless user experiences and rock-solid offline synchronization.',
                'description' => 'From enterprise operational tools to consumer-facing platforms, we construct fluid mobile experiences using React Native, Flutter, and Swift, ensuring hardware-level optimization, biometric authentication, and push architecture.',
                'features' => ['Cross-Platform iOS & Android', 'Offline-First Synchronization', 'Biometric & Hardware Security', 'Real-time Event Streaming', 'App Store / Play Store Deployment Management'],
                'technologies' => ['React Native', 'Flutter', 'iOS / Swift', 'Android / Kotlin', 'Firebase'],
                'icon' => 'Smartphone',
                'display_order' => 2,
            ],
            [
                'name' => 'IT Consulting & Architecture',
                'slug' => 'it-consulting',
                'summary' => 'Strategic advisory and software architecture review to modernize legacy enterprise systems and streamline IT operations.',
                'description' => 'We empower corporate executives and CTOs with independent technical audits, legacy system modernization plans, scalable architecture roadmaps, and cybersecurity frameworks aligned with ISO/IEC standards.',
                'features' => ['Legacy System Modernization', 'Cloud Migration Strategies', 'Architecture Feasibility Audits', 'Technology Due Diligence', 'Compliance & Data Governance'],
                'technologies' => ['AWS', 'Google Cloud', 'Kubernetes', 'Enterprise Arch', 'Zero-Trust Security'],
                'icon' => 'Briefcase',
                'display_order' => 3,
            ],
            [
                'name' => 'Internship & Talent Accelerator',
                'slug' => 'internship-programs',
                'summary' => 'Rigorous industrial training programs grooming the next generation of full-stack engineers and technology leaders.',
                'description' => 'Our highly structured internship tracks immerse undergraduates in real-world corporate codebases, agile scrums, peer code reviews, and production deployments, accompanied by verifiable cryptographic credentials.',
                'features' => ['Production Project Immersion', 'Direct Senior Mentorship', 'Verifiable Digital Credentials', 'Scrum & Agile Sprint Cadence', 'Post-Internship Placement Opportunities'],
                'technologies' => ['Full-Stack Web', 'Cloud Infrastructure', 'DevOps', 'Cybersecurity', 'AI & ML'],
                'icon' => 'GraduationCap',
                'display_order' => 4,
            ],
            [
                'name' => 'Cloud Services & DevOps',
                'slug' => 'cloud-services',
                'summary' => 'Zero-downtime cloud migration, Kubernetes orchestration, and automated infrastructure as code (IaC).',
                'description' => 'Accelerate engineering velocity with elastic infrastructure, automated canary deployments, proactive observability, and multi-region redundancy designed to eliminate single points of failure.',
                'features' => ['Multi-Cloud Infrastructure (AWS/GCP/Azure)', 'Automated CI/CD Workflows', 'Kubernetes Cluster Management', 'Proactive APM Monitoring & Alerting', 'Disaster Recovery Systems'],
                'technologies' => ['Terraform', 'Kubernetes', 'Docker', 'AWS', 'Grafana', 'Prometheus'],
                'icon' => 'Cloud',
                'display_order' => 5,
            ],
            [
                'name' => 'Cybersecurity Services',
                'slug' => 'cybersecurity-services',
                'summary' => 'Proactive penetration testing, vulnerability assessments, and zero-trust security defense protocols.',
                'description' => 'Safeguard your proprietary data, assets, and reputation against sophisticated attack vectors. Our certified ethical hackers perform comprehensive static/dynamic code audits, network defense, and compliance readiness assessments.',
                'features' => ['Web & Mobile Penetration Testing', 'Cloud Posture Vulnerability Scans', 'SOC 2 & ISO 27001 Readiness', 'Zero-Trust Identity Implementation', 'Incident Response Playbooks'],
                'technologies' => ['OWASP Standards', 'Burp Suite', 'SonarQube', 'WAF Protocols', 'HashiCorp Vault'],
                'icon' => 'ShieldCheck',
                'display_order' => 6,
            ],
        ];

        foreach ($services as $service) {
            Service::updateOrCreate(['slug' => $service['slug']], $service);
        }

        // 4. Products Setup (Explicitly tagged as Demo/Placeholder)
        $products = [
            [
                'name' => 'LMC CRM System',
                'slug' => 'lmc-crm-system',
                'summary' => '[DEMO PLATFORM] Enterprise relationship management system streamlining lead capture, deal pipelines, and automated client interactions.',
                'description' => 'A modular customer relationship system engineered for high-velocity B2B sales teams. Features real-time pipeline visibility, multi-channel communication logging, automated follow-up cadences, and predictive conversion metrics.',
                'features' => ['Kanban Deal Pipeline', 'Automated Email & SMS Sequences', 'Customer Lifetime Value Analytics', 'Granular Role-based Access Control'],
                'benefits' => ['Increases lead conversion velocity by 34%', 'Eliminates dropped follow-up opportunities', 'Unified audit trail for executive oversight'],
                'tech_stack' => ['Laravel 12', 'React 19', 'Tailwind CSS', 'PostgreSQL', 'Redis'],
                'is_demo' => true,
                'status' => 'Available',
                'display_order' => 1,
            ],
            [
                'name' => 'LMC HR Management System',
                'slug' => 'lmc-hr-system',
                'summary' => '[DEMO PLATFORM] Unified human capital portal covering payroll automation, biometric leave tracking, and employee appraisals.',
                'description' => 'End-to-end human resource suite offering seamless onboarding, statutory tax calculation, leave approval hierarchies, and key performance indicator (KPI) scorecards for remote and hybrid workforces.',
                'features' => ['Automated Payroll Engine', 'Biometric Hardware Sync', 'Performance Review Workflows', 'Self-Service Employee Portal'],
                'benefits' => ['Cuts monthly payroll processing time by 80%', '100% compliance with labor regulations', 'Transparent employee career progression'],
                'tech_stack' => ['PHP 8.2', 'Laravel', 'React', 'Tailwind', 'MySQL'],
                'is_demo' => true,
                'status' => 'Available',
                'display_order' => 2,
            ],
            [
                'name' => 'LMC Inventory Management System',
                'slug' => 'lmc-inventory-system',
                'summary' => '[DEMO PLATFORM] Multi-warehouse inventory control with barcode scanning, reorder forecasting, and supplier lifecycle integration.',
                'description' => 'Keep optimal stock levels across distributed distribution centers. Integrates serial/batch tracking, real-time inventory transfers, predictive procurement notifications, and supplier performance scorecards.',
                'features' => ['Batch & Serial Number Tracking', 'Automated Reorder Triggers', 'Multi-Warehouse Allocation', 'Barcode / QR Scanner Interface'],
                'benefits' => ['Zero stockout events during peak periods', 'Complete traceability from receiving to delivery', 'Minimized carrying costs'],
                'tech_stack' => ['Laravel', 'React', 'Inertia.js', 'PostgreSQL'],
                'is_demo' => true,
                'status' => 'Available',
                'display_order' => 3,
            ],
            [
                'name' => 'LMC School Management System',
                'slug' => 'lmc-school-system',
                'summary' => '[DEMO PLATFORM] Comprehensive educational administrative hub for admissions, grading rubrics, timetable scheduling, and parent portals.',
                'description' => 'Modern learning and administrative infrastructure for K-12 and tertiary institutions. Seamlessly handles fee invoicing, automated grade card generation, exam scheduling, and parent communications.',
                'features' => ['Student Information System (SIS)', 'Exam & Report Card Generator', 'Online Fee Gateway & Receipts', 'Parent & Guardian Mobile App'],
                'benefits' => ['Paperless school administrative operations', 'Real-time parent-teacher transparency', 'Instant report card generation'],
                'tech_stack' => ['Laravel', 'Vue/React', 'Tailwind CSS', 'MySQL'],
                'is_demo' => true,
                'status' => 'Available',
                'display_order' => 4,
            ],
            [
                'name' => 'LMC Hospital Management System',
                'slug' => 'lmc-hospital-system',
                'summary' => '[DEMO PLATFORM] Clinical workflow and EHR management platform designed for inpatient, outpatient, and pharmacy synchronization.',
                'description' => 'HIPAA-conscious healthcare operating system managing patient records, doctor appointment queues, electronic prescriptions, pharmacy billing, and diagnostic lab test dispatches with maximum data privacy.',
                'features' => ['Electronic Health Records (EHR)', 'Doctor Appointment Queue', 'Pharmacy & Lab Dispatch Sync', 'Inpatient Bed Allocation'],
                'benefits' => ['Decreased patient triage wait times', 'Secure, tamper-evident medical history logs', 'Accurate pharmacy inventory reconciliation'],
                'tech_stack' => ['Laravel', 'React', 'PostgreSQL', 'Docker'],
                'is_demo' => true,
                'status' => 'Available',
                'display_order' => 5,
            ],
            [
                'name' => 'LMC Point of Sale System',
                'slug' => 'lmc-pos-system',
                'summary' => '[DEMO PLATFORM] Ultra-fast retail POS software with offline resilience, thermal receipt printing, and split-payment processing.',
                'description' => 'Engineered for high-volume retail, dining, and supermarket environments. Continues operating seamlessly through internet dropouts and synchronizes automatically upon reconnection.',
                'features' => ['Sub-second Barcode Processing', 'Offline-First Cashier Mode', 'Receipt & Kitchen Printer Integration', 'Promotions & Loyalty Engine'],
                'benefits' => ['Eliminates checkout line bottlenecks', 'Zero downtime during connectivity drops', 'Real-time margin analysis'],
                'tech_stack' => ['React', 'Inertia.js', 'Laravel', 'SQLite/MySQL'],
                'is_demo' => true,
                'status' => 'Available',
                'display_order' => 6,
            ],
            [
                'name' => 'LMC Project Management System',
                'slug' => 'lmc-project-management',
                'summary' => '[DEMO PLATFORM] Agile task tracking, Gantt scheduling, and developer milestone resource allocation platform.',
                'description' => 'Built for technology enterprises and engineering teams to coordinate sprints, track billable developer hours, visualize dependencies on interactive Gantt charts, and measure team sprint velocity.',
                'features' => ['Interactive Gantt & Kanban Views', 'Sprint Velocity & Burndown Charts', 'Time Tracking & Timesheet Approvals', 'Git Commit & PR Integration'],
                'benefits' => ['On-time software deliverable milestone completions', 'Clear team capacity allocation', 'Transparent client progress reporting'],
                'tech_stack' => ['Laravel', 'React', 'Recharts', 'Tailwind CSS'],
                'is_demo' => true,
                'status' => 'Available',
                'display_order' => 7,
            ],
            [
                'name' => 'LMC Employee Attendance System',
                'slug' => 'lmc-attendance-system',
                'summary' => '[DEMO PLATFORM] Precision attendance logging software with geofencing, QR check-ins, and shift management.',
                'description' => 'Enterprise attendance and duty scheduling platform supporting multi-shift rosters, geofenced mobile verification, IP restriction, and automated overtime calculations with one-click export to payroll.',
                'features' => ['GPS Geofence Validation', 'Dynamic QR Code Clock-In', 'Shift Roster Automation', 'Overtime Calculation Engine'],
                'benefits' => ['Prevents buddy punching and time theft', 'Simplifies complex shift rosters', 'Instant biometric report audits'],
                'tech_stack' => ['Laravel', 'React 19', 'Tailwind', 'MySQL'],
                'is_demo' => true,
                'status' => 'Available',
                'display_order' => 8,
            ],
        ];

        foreach ($products as $product) {
            Product::updateOrCreate(['slug' => $product['slug']], $product);
        }

        // 5. Internships & Attendance Records
        $internsData = [
            [
                'intern_id' => 'LMC-INT-2026-001',
                'user_id' => $internUser->id,
                'name' => 'Nimesh Fernando',
                'email' => 'intern@lmcglobal.tech',
                'phone' => '+94 71 987 6543',
                'university' => 'University of Colombo - School of Computing',
                'course' => 'BSc (Hons) in Software Engineering',
                'department' => 'Software Engineering & Cloud Architecture',
                'start_date' => Carbon::now()->subMonths(6)->toDateString(),
                'end_date' => Carbon::now()->subDays(5)->toDateString(),
                'status' => 'Completed',
                'verification_status' => 'Verified',
                'verification_code' => 'LMC-VER-UCSC-98214',
                'supervisor' => 'Elena Jayawardena (Senior Lead)',
                'project_title' => 'Microservices API Gateway & Distributed Caching Layer',
                'performance_score' => 96.5,
                'notes' => 'Exemplary problem-solving capability, high code quality, and exceptional collaboration during sprint cycles.',
            ],
            [
                'intern_id' => 'LMC-INT-2026-002',
                'user_id' => null,
                'name' => 'Kavindi Perera',
                'email' => 'kavindi.p@sliit.lk',
                'phone' => '+94 77 456 7890',
                'university' => 'SLIIT (Sri Lanka Institute of Information Technology)',
                'course' => 'BSc (Hons) in Information Technology',
                'department' => 'Cloud Services & DevOps Infrastructure',
                'start_date' => Carbon::now()->subMonths(3)->toDateString(),
                'end_date' => Carbon::now()->addMonths(3)->toDateString(),
                'status' => 'Active',
                'verification_status' => 'Verified',
                'verification_code' => 'LMC-VER-SLIIT-44129',
                'supervisor' => 'Elena Jayawardena (Senior Lead)',
                'project_title' => 'Terraform Automated Deployment Pipeline on AWS',
                'performance_score' => 92.0,
                'notes' => 'Very strong grasp of containerization, Docker, and CI/CD pipelines.',
            ],
            [
                'intern_id' => 'LMC-INT-2026-003',
                'user_id' => null,
                'name' => 'Sachintha Silva',
                'email' => 'sachintha.silva@uom.lk',
                'phone' => '+94 76 333 8899',
                'university' => 'University of Moratuwa',
                'course' => 'BSc (Hons) in Computer Science & Engineering',
                'department' => 'Artificial Intelligence & Data Engineering',
                'start_date' => Carbon::now()->subMonths(2)->toDateString(),
                'end_date' => Carbon::now()->addMonths(4)->toDateString(),
                'status' => 'Active',
                'verification_status' => 'Verified',
                'verification_code' => 'LMC-VER-UOM-77310',
                'supervisor' => 'Admin User',
                'project_title' => 'Predictive Customer Churn Model with PyTorch & FastAPI',
                'performance_score' => 94.8,
                'notes' => 'Outstanding algorithmic reasoning and deep mathematical foundations.',
            ],
            [
                'intern_id' => 'LMC-INT-2026-004',
                'user_id' => null,
                'name' => 'Tharushi De Silva',
                'email' => 'tharushi.desilva@iit.ac.lk',
                'phone' => '+94 70 882 1144',
                'university' => 'Informatics Institute of Technology (IIT Sri Lanka)',
                'course' => 'BSc (Hons) in Cybersecurity & Digital Forensics',
                'department' => 'Cybersecurity & Defensive Engineering',
                'start_date' => Carbon::now()->subMonths(7)->toDateString(),
                'end_date' => Carbon::now()->subMonths(1)->toDateString(),
                'status' => 'Completed',
                'verification_status' => 'Verified',
                'verification_code' => 'LMC-VER-IIT-51928',
                'supervisor' => 'Elena Jayawardena (Senior Lead)',
                'project_title' => 'Automated Static Application Security Testing (SAST) Scanner',
                'performance_score' => 98.0,
                'notes' => 'Discovered and patched critical security flaws in pre-production staging.',
            ],
        ];

        foreach ($internsData as $data) {
            $intern = Intern::updateOrCreate(['intern_id' => $data['intern_id']], $data);

            // Generate daily attendance for the past 40 weekdays
            $daysCount = 40;
            for ($i = $daysCount; $i >= 1; $i--) {
                $date = Carbon::now()->subDays($i);
                if ($date->isWeekend()) {
                    continue;
                }

                // High attendance record (95%+)
                $status = ($i % 17 === 0) ? 'Leave' : (($i % 23 === 0) ? 'Half-day' : 'Present');

                Attendance::updateOrCreate(
                    [
                        'intern_id' => $intern->id,
                        'date' => $date->toDateString(),
                    ],
                    [
                        'check_in' => $status !== 'Leave' ? '08:45:00' : null,
                        'check_out' => $status !== 'Leave' ? '17:30:00' : null,
                        'status' => $status,
                        'notes' => $status === 'Leave' ? 'Approved academic leave' : 'On schedule',
                    ]
                );
            }
        }

        // 6. Reviews & Testimonials
        $reviews = [
            [
                'name' => 'Duminda Bandara',
                'email' => 'duminda@apexlogistics.lk',
                'company' => 'Apex Global Logistics Ltd',
                'role' => 'Chief Technology Officer',
                'rating' => 5,
                'service_or_product' => 'Web Application Development',
                'review' => 'LMC Global Technologies modernized our dispatch logistics engine with flawless precision. Their engineering architecture cut down our route calculation latency from 14 seconds to under 400 milliseconds. Truly world-class expertise.',
                'is_verified_client' => true,
                'status' => 'Approved',
                'admin_notes' => 'Verified enterprise client testimonial.',
            ],
            [
                'name' => 'Michelle Gunaratne',
                'email' => 'm.gunaratne@horizonhealth.com',
                'company' => 'Horizon Healthcare International',
                'role' => 'Head of Digital Transformation',
                'rating' => 5,
                'service_or_product' => 'LMC Hospital Management System',
                'review' => 'The hospital management demo provided by LMC was tailored into a fully operational patient record suite for our clinic branch within two months. Security and HIPAA compliance were addressed seamlessly from day one.',
                'is_verified_client' => true,
                'status' => 'Approved',
                'admin_notes' => 'Authorized for public portal display.',
            ],
            [
                'name' => 'Pradeep Senanayake',
                'email' => 'pradeep@solarfleet.io',
                'company' => 'SolarFleet Renewable Energy',
                'role' => 'Managing Director',
                'rating' => 5,
                'service_or_product' => 'Cloud Services & DevOps',
                'review' => 'Migrating our telemetry microservices into Kubernetes with LMC was the smoothest cloud infrastructure transition we have ever undergone. Zero downtime during cutover, and our cloud expenses dropped by 28%.',
                'is_verified_client' => true,
                'status' => 'Approved',
                'admin_notes' => 'Verified client review.',
            ],
            [
                'name' => 'Anil Ratnayake',
                'email' => 'anil@capitalinvest.lk',
                'company' => 'Capital Synergy Holdings',
                'role' => 'Chief Financial Officer',
                'rating' => 4,
                'service_or_product' => 'IT Consulting & Architecture',
                'review' => 'Thorough architectural audit of our trading platforms. The report highlighted critical bottlenecks that our previous consultants completely missed.',
                'is_verified_client' => true,
                'status' => 'Approved',
                'admin_notes' => 'Approved by admin.',
            ],
            [
                'name' => 'Kusal Mendis',
                'email' => 'kusal@retailpulse.com',
                'company' => 'Pulse Retail Group',
                'role' => 'Operations Manager',
                'rating' => 5,
                'service_or_product' => 'LMC Point of Sale System',
                'review' => 'We deployed the POS demo system across 6 pop-up stores and the offline mode worked wonderfully even when local internet dropped.',
                'is_verified_client' => false,
                'status' => 'Pending', // Pending review for admin workflow testing!
                'admin_notes' => 'Newly submitted public review awaiting moderation.',
            ],
            [
                'name' => 'Shenali Wickramasinghe',
                'email' => 'shenali@edunext.lk',
                'company' => 'EduNext Online Academy',
                'role' => 'Academic Dean',
                'rating' => 5,
                'service_or_product' => 'Internship Programs',
                'review' => 'Our graduates who completed the LMC Internship Accelerator were headhunted by top tech firms within weeks. The syllabus and mentorship standard is peerless.',
                'is_verified_client' => true,
                'status' => 'Pending', // Pending review for admin workflow testing!
                'admin_notes' => 'Submitted via public review portal.',
            ],
        ];

        foreach ($reviews as $rev) {
            Review::updateOrCreate(['email' => $rev['email'], 'company' => $rev['company']], $rev);
        }

        // 7. Customers, Leads, FollowUps, Tasks (CRM)
        $customers = [
            [
                'name' => 'Apex Global Logistics Ltd',
                'company' => 'Apex Global Logistics Ltd',
                'email' => 'contact@apexlogistics.lk',
                'phone' => '+94 11 789 4400',
                'address' => 'Level 18, World Trade Center, Colombo 01',
                'industry' => 'Logistics & Supply Chain',
                'status' => 'active',
                'notes' => 'Long-term SLA agreement active for enterprise logistics software.',
            ],
            [
                'name' => 'Horizon Healthcare International',
                'company' => 'Horizon Healthcare International',
                'email' => 'info@horizonhealth.com',
                'phone' => '+94 11 258 9630',
                'address' => '45 Dharmapala Mawatha, Colombo 07',
                'industry' => 'Healthcare & MedTech',
                'status' => 'active',
                'notes' => 'Quarterly maintenance contract for EHR hospital management software.',
            ],
            [
                'name' => 'SolarFleet Renewable Energy',
                'company' => 'SolarFleet Renewable Energy',
                'email' => 'partners@solarfleet.io',
                'phone' => '+94 81 445 2200',
                'address' => 'Technology Park, Kandy',
                'industry' => 'CleanTech / IoT',
                'status' => 'active',
                'notes' => 'Cloud infrastructure contract on AWS with automated monitoring.',
            ],
        ];

        foreach ($customers as $c) {
            Customer::updateOrCreate(['name' => $c['name']], $c);
        }

        $leads = [
            [
                'name' => 'Ceylinco Agro Exports',
                'company' => 'Ceylinco Agro Exports (Pvt) Ltd',
                'email' => 'export@ceylincoagro.lk',
                'phone' => '+94 77 999 1234',
                'source' => 'Website',
                'status' => 'Proposal',
                'estimated_value' => 45000.00,
                'assigned_to' => $staff->id,
                'notes' => 'Requesting full enterprise ERP overhaul including inventory and barcoding.',
            ],
            [
                'name' => 'FinLease Financial Services',
                'company' => 'FinLease PLC',
                'email' => 'tech@finlease.com',
                'phone' => '+94 11 555 8899',
                'source' => 'Referral',
                'status' => 'Qualified',
                'estimated_value' => 78000.00,
                'assigned_to' => $admin->id,
                'notes' => 'Seeking cybersecurity compliance audit and cloud migration.',
            ],
            [
                'name' => 'Metropolis Retail Chain',
                'company' => 'Metropolis Lanka Retail',
                'email' => 'operations@metropolis.lk',
                'phone' => '+94 71 444 3322',
                'source' => 'LinkedIn',
                'status' => 'Contacted',
                'estimated_value' => 28500.00,
                'assigned_to' => $staff->id,
                'notes' => 'Exploring multi-outlet Point of Sale rollout across 12 stores.',
            ],
            [
                'name' => 'BioGen Life Sciences',
                'company' => 'BioGen Life Sciences Ltd',
                'email' => 'director@biogenlife.com',
                'phone' => '+94 70 123 7788',
                'source' => 'Website',
                'status' => 'New',
                'estimated_value' => 52000.00,
                'assigned_to' => null,
                'notes' => 'Submitted online enquiry regarding custom laboratory information system.',
            ],
        ];

        foreach ($leads as $l) {
            $leadRecord = Lead::updateOrCreate(['name' => $l['name']], $l);

            // Add follow-up
            FollowUp::create([
                'lead_id' => $leadRecord->id,
                'user_id' => $admin->id,
                'follow_up_date' => Carbon::now()->addDays(2),
                'notes' => 'Schedule discovery zoom call and present tailored solution architecture.',
                'status' => 'Pending',
            ]);
        }

        // Tasks
        $tasks = [
            [
                'title' => 'Finalize Enterprise Cloud SLA proposal for FinLease PLC',
                'description' => 'Draft detailed SLA terms, recovery time objective (RTO) and recovery point objective (RPO).',
                'assigned_to' => $staff->id,
                'due_date' => Carbon::now()->addDays(3)->toDateString(),
                'priority' => 'Urgent',
                'status' => 'In Progress',
            ],
            [
                'title' => 'Audit newly submitted client reviews in moderation queue',
                'description' => 'Inspect submitted testimonials against authentic enterprise client database before public publication.',
                'assigned_to' => $admin->id,
                'due_date' => Carbon::now()->addDays(1)->toDateString(),
                'priority' => 'High',
                'status' => 'Pending',
            ],
            [
                'title' => 'Conduct mid-term internship evaluation for Kavindi Perera',
                'description' => 'Assess cloud infrastructure deliverable and update performance scorecard.',
                'assigned_to' => $staff->id,
                'due_date' => Carbon::now()->addDays(5)->toDateString(),
                'priority' => 'Medium',
                'status' => 'Pending',
            ],
            [
                'title' => 'Prepare Quarterly Technology Beyond Boundaries Tech Briefing',
                'description' => 'Synthesize Q3 innovations, tech stack upgrades, and client delivery statistics.',
                'assigned_to' => $admin->id,
                'due_date' => Carbon::now()->addDays(7)->toDateString(),
                'priority' => 'Low',
                'status' => 'Pending',
            ],
        ];

        foreach ($tasks as $t) {
            Task::updateOrCreate(['title' => $t['title']], $t);
        }

        // 8. Contact Enquiries
        $messages = [
            [
                'name' => 'Raveen Samarasinghe',
                'email' => 'raveen@samarasinghe.org',
                'phone' => '+94 77 888 5522',
                'subject' => 'Enterprise Web Platform Consultation Inquiry',
                'message' => 'Good day, our corporation is seeking a robust full-stack solution to replace our legacy intranet. We would like to schedule an introductory architectural discussion.',
                'status' => 'Unread',
            ],
            [
                'name' => 'Prof. Sunil Wijesuriya',
                'email' => 's.wijesuriya@university.lk',
                'phone' => '+94 11 445 6677',
                'subject' => 'University Partnership for Software Internship Program',
                'message' => 'Dear LMC Leadership team, our Computer Science faculty is interested in formalizing an official industrial training MOU for our 3rd-year cohort.',
                'status' => 'Read',
            ],
            [
                'name' => 'Chathura Rajapaksa',
                'email' => 'chathura@techexport.lk',
                'phone' => '+94 71 222 9900',
                'subject' => 'Cloud Migration & Penetration Testing RFP',
                'message' => 'Please provide RFP submission guidelines for a full security penetration testing audit on our banking gateway integration.',
                'status' => 'Resolved',
            ],
        ];

        foreach ($messages as $m) {
            ContactMessage::updateOrCreate(['email' => $m['email'], 'subject' => $m['subject']], $m);
        }
    }
}
