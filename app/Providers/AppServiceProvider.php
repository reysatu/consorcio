<?php

namespace App\Providers;

use App\Http\Composers\MenuComposer;
use App\Http\Recopro\AnalysisUnitaryPrice\AnalysisUnitaryPrice;
use App\Http\Recopro\AnalysisUnitaryPrice\AnalysisUnitaryPriceInterface;
use App\Http\Recopro\AnalysisUnitaryPrice\AnalysisUnitaryPriceRepository;
use App\Http\Recopro\Approval_autonomy\Approval_autonomy;
use App\Http\Recopro\Approval_autonomy\Approval_autonomyInterface;
use App\Http\Recopro\Approval_autonomy\Approval_autonomyRepository;
use App\Http\Recopro\ApproverProject\ApproverProject;
use App\Http\Recopro\ApproverProject\ApproverProjectInterface;
use App\Http\Recopro\ApproverProject\ApproverProjectRepository;
use App\Http\Recopro\ApproverProjectDetail\ApproverProjectDetail;
use App\Http\Recopro\ApproverProjectDetail\ApproverProjectDetailInterface;
use App\Http\Recopro\ApproverProjectDetail\ApproverProjectDetailRepository;
use App\Http\Recopro\Brand\Brand;
use App\Http\Recopro\Brand\BrandInterface;
use App\Http\Recopro\Brand\BrandRepository;
use App\Http\Recopro\Buyer\BuyerInterface;
use App\Http\Recopro\Config\ConfigInterface;
use App\Http\Recopro\ConsumerReturn\ConsumerReturn;
use App\Http\Recopro\ConsumerReturn\ConsumerReturnInterface;
use App\Http\Recopro\ConsumerReturn\ConsumerReturnRepository;
use App\Http\Recopro\ConsumerReturnProduct\ConsumerReturnProduct;
use App\Http\Recopro\ConsumerReturnProduct\ConsumerReturnProductInterface;
use App\Http\Recopro\ConsumerReturnProduct\ConsumerReturnProductRepository;
use App\Http\Recopro\Consumption\Consumption;
use App\Http\Recopro\Consumption\ConsumptionInterface;
use App\Http\Recopro\Consumption\ConsumptionRepository;
use App\Http\Recopro\ConsumptionProduct\ConsumptionProduct;
use App\Http\Recopro\ConsumptionProduct\ConsumptionProductInterface;
use App\Http\Recopro\ConsumptionProduct\ConsumptionProductRepository;
use App\Http\Recopro\ContestAutonomyApproval\ContestAutonomyApproval;
use App\Http\Recopro\ContestAutonomyApproval\ContestAutonomyApprovalInterface;
use App\Http\Recopro\ContestAutonomyApproval\ContestAutonomyApprovalRepository;
use App\Http\Recopro\ContestConsolidated\ContestConsolidated;
use App\Http\Recopro\ContestConsolidated\ContestConsolidatedInterface;
use App\Http\Recopro\ContestConsolidated\ContestConsolidatedRepository;
use App\Http\Recopro\ContestProvider\ContestProvider;
use App\Http\Recopro\ContestProvider\ContestProviderInterface;
use App\Http\Recopro\ContestProvider\ContestProviderRepository;
use App\Http\Recopro\ContestProviderDetail\ContestProviderDetail;
use App\Http\Recopro\ContestProviderDetail\ContestProviderDetailInterface;
use App\Http\Recopro\ContestProviderDetail\ContestProviderDetailRepository;
use App\Http\Recopro\ContestRequirement\ContestRequirement;
use App\Http\Recopro\ContestRequirement\ContestRequirementInterface;
use App\Http\Recopro\ContestRequirement\ContestRequirementRepository;
use App\Http\Recopro\Currency\Currency;
use App\Http\Recopro\Currency\CurrencyInterface;
use App\Http\Recopro\Currency\CurrencyRepository;

use App\Http\Recopro\Measure\Measure;
use App\Http\Recopro\Measure\MeasureInterface;
use App\Http\Recopro\Measure\MeasureRepository;

use App\Http\Recopro\Shop\Shop;
use App\Http\Recopro\Shop\ShopInterface;
use App\Http\Recopro\Shop\ShopRepository;

use App\Http\Recopro\Category\Category;
use App\Http\Recopro\Category\CategoryInterface;
use App\Http\Recopro\Category\CategoryRepository;

use App\Http\Recopro\HeadAccountan\HeadAccountan;
use App\Http\Recopro\HeadAccountan\HeadAccountanInterface;
use App\Http\Recopro\HeadAccountan\HeadAccountanRepository;

use App\Http\Recopro\Operation\Operation;
use App\Http\Recopro\Operation\OperationInterface;
use App\Http\Recopro\Operation\OperationRepository;

use App\Http\Recopro\Family\Family;
use App\Http\Recopro\Family\FamilyInterface;
use App\Http\Recopro\Family\FamilyRepository;

use App\Http\Recopro\SubFamily\SubFamily;
use App\Http\Recopro\SubFamily\SubFamilyInterface;
use App\Http\Recopro\SubFamily\SubFamilyRepository;

use App\Http\Recopro\Lot\Lot;
use App\Http\Recopro\Lot\LotInterface;
use App\Http\Recopro\Lot\LotRepository;

use App\Http\Recopro\Localizacion\Localizacion;
use App\Http\Recopro\Localizacion\LocalizacionInterface;
use App\Http\Recopro\Localizacion\LocalizacionRepository;

use App\Http\Recopro\Modelo\Modelo;
use App\Http\Recopro\Modelo\ModeloInterface;
use App\Http\Recopro\Modelo\ModeloRepository;

use App\Http\Recopro\Register_Transfer_Articulo\Register_Transfer_Articulo;
use App\Http\Recopro\Register_Transfer_Articulo\Register_Transfer_ArticuloInterface;
use App\Http\Recopro\Register_Transfer_Articulo\Register_Transfer_ArticuloRepository;

use App\Http\Recopro\Register_Transfer_Detalle\Register_Transfer_Detalle;
use App\Http\Recopro\Register_Transfer_Detalle\Register_Transfer_DetalleInterface;
use App\Http\Recopro\Register_Transfer_Detalle\Register_Transfer_DetalleRepository;

use App\Http\Recopro\Operation_Usuario\Operation_Usuario;
use App\Http\Recopro\Operation_Usuario\Operation_UsuarioInterface;
use App\Http\Recopro\Operation_Usuario\Operation_UsuarioRepository;

use App\Http\Recopro\Accoudet\Accoudet;
use App\Http\Recopro\Accoudet\AccoudetInterface;
use App\Http\Recopro\Accoudet\AccoudetRepository;

use App\Http\Recopro\Ubigeo\Ubigeo;
use App\Http\Recopro\Ubigeo\UbigeoInterface;
use App\Http\Recopro\Ubigeo\UbigeoRepository;

use App\Http\Recopro\Serie\Serie;
use App\Http\Recopro\Serie\SerieInterface;
use App\Http\Recopro\Serie\SerieRepository;

use App\Http\Recopro\Register_movement\Register_movement;
use App\Http\Recopro\Register_movement\Register_movementInterface;
use App\Http\Recopro\Register_movement\Register_movementRepository;

use App\Http\Recopro\Register_transfer\Register_transfer;
use App\Http\Recopro\Register_transfer\Register_transferInterface;
use App\Http\Recopro\Register_transfer\Register_transferRepository;

use App\Http\Recopro\Generation_remision\Generation_remision;
use App\Http\Recopro\Generation_remision\Generation_remisionInterface;
use App\Http\Recopro\Generation_remision\Generation_remisionRepository;

use App\Http\Recopro\Naturaleza\Naturaleza;
use App\Http\Recopro\Naturaleza\NaturalezaInterface;
use App\Http\Recopro\Naturaleza\NaturalezaRepository;

use App\Http\Recopro\Articulo_Kit\Articulo_Kit;
use App\Http\Recopro\Articulo_Kit\Articulo_KitInterface;
use App\Http\Recopro\Articulo_Kit\Articulo_KitRepository;

use App\Http\Recopro\Register_movement_Articulo\Register_movement_Articulo;
use App\Http\Recopro\Register_movement_Articulo\Register_movement_ArticuloInterface;
use App\Http\Recopro\Register_movement_Articulo\Register_movement_ArticuloRepository;

use App\Http\Recopro\Query_stock\Query_stock;
use App\Http\Recopro\Query_stock\Query_stockInterface;
use App\Http\Recopro\Query_stock\Query_stockRepository;

use App\Http\Recopro\Query_movements\Query_movements;
use App\Http\Recopro\Query_movements\Query_movementsInterface;
use App\Http\Recopro\Query_movements\Query_movementsRepository;

use App\Http\Recopro\Register_movement_Detalle\Register_movement_Detalle;
use App\Http\Recopro\Register_movement_Detalle\Register_movement_DetalleInterface;
use App\Http\Recopro\Register_movement_Detalle\Register_movement_DetalleRepository;

use App\Http\Recopro\Almacen_Stock_Localizacion\Almacen_Stock_Localizacion;
use App\Http\Recopro\Almacen_Stock_Localizacion\Almacen_Stock_LocalizacionInterface;
use App\Http\Recopro\Almacen_Stock_Localizacion\Almacen_Stock_LocalizacionRepository;

use App\Http\Recopro\Departure\Departure;
use App\Http\Recopro\Departure\DepartureInterface;
use App\Http\Recopro\Departure\DepartureRepository;
use App\Http\Recopro\DepartureProduct\DepartureProduct;
use App\Http\Recopro\DepartureProduct\DepartureProductInterface;
use App\Http\Recopro\DepartureProduct\DepartureProductRepository;
use App\Http\Recopro\DocumentType\DocumentTypeInterface;
use App\Http\Recopro\Entity\Entity;
use App\Http\Recopro\Entity\EntityInterface;
use App\Http\Recopro\Entity\EntityRepository;
use App\Http\Recopro\Entry\Entry;
use App\Http\Recopro\Entry\EntryInterface;
use App\Http\Recopro\Entry\EntryRepository;
use App\Http\Recopro\EntryProduct\EntryProduct;
use App\Http\Recopro\EntryProduct\EntryProductInterface;
use App\Http\Recopro\EntryProduct\EntryProductRepository;
use App\Http\Recopro\Front\FrontInterface;
use App\Http\Recopro\Level\LevelInterface;
use App\Http\Recopro\Module\Module;
use App\Http\Recopro\Module\ModuleInterface;
use App\Http\Recopro\Module\ModuleRepository;
use App\Http\Recopro\MotiveTransfer\MotiveTransfer;
use App\Http\Recopro\MotiveTransfer\MotiveTransferInterface;
use App\Http\Recopro\MotiveTransfer\MotiveTransferRepository;
use App\Http\Recopro\Param\Param;
use App\Http\Recopro\Param\ParamInterface;
use App\Http\Recopro\Param\ParamRepository;
use App\Http\Recopro\PaymentCondition\PaymentCondition;
use App\Http\Recopro\PaymentCondition\PaymentConditionInterface;
use App\Http\Recopro\PaymentCondition\PaymentConditionRepository;
use App\Http\Recopro\Permission\Permission;
use App\Http\Recopro\Permission\PermissionInterface;
use App\Http\Recopro\Permission\PermissionRepository;
use App\Http\Recopro\Petty_cash\Petty_cash;
use App\Http\Recopro\Petty_cash\Petty_cashInterface;
use App\Http\Recopro\Petty_cash\Petty_cashRepository;
use App\Http\Recopro\Petty_cashUser\Petty_cashUser;
use App\Http\Recopro\Petty_cashUser\Petty_cashUserInterface;
use App\Http\Recopro\Petty_cashUser\Petty_cashUserRepository;
use App\Http\Recopro\PlanAccount\PlanAccount;
use App\Http\Recopro\PlanAccount\PlanAccountInterface;
use App\Http\Recopro\PlanAccount\PlanAccountRepository;
use App\Http\Recopro\Product\ProductInterface;
use App\Http\Recopro\ProductBrand\ProductBrand;
use App\Http\Recopro\ProductBrand\ProductBrandInterface;
use App\Http\Recopro\ProductBrand\ProductBrandRepository;
use App\Http\Recopro\Profile\ProfileInterface;
use App\Http\Recopro\Project\Project;
use App\Http\Recopro\Project\ProjectInterface;
use App\Http\Recopro\Project\ProjectRepository;
use App\Http\Recopro\ProjectConsolidated\ProjectConsolidated;
use App\Http\Recopro\ProjectConsolidated\ProjectConsolidatedInterface;
use App\Http\Recopro\ProjectConsolidated\ProjectConsolidatedRepository;
use App\Http\Recopro\DocumentType\DocumentType;
use App\Http\Recopro\DocumentType\DocumentTypeRepository;
use App\Http\Recopro\ProjectGGT\ProjectGGT;
use App\Http\Recopro\ProjectGGT\ProjectGGTInterface;
use App\Http\Recopro\ProjectGGT\ProjectGGTRepository;
use App\Http\Recopro\ProjectState\ProjectState;
use App\Http\Recopro\ProjectState\ProjectStateInterface;
use App\Http\Recopro\ProjectState\ProjectStateRepository;
use App\Http\Recopro\ProjectSubState\ProjectSubState;
use App\Http\Recopro\ProjectSubState\ProjectSubStateInterface;
use App\Http\Recopro\ProjectSubState\ProjectSubStateRepository;
use App\Http\Recopro\PurchaseOrder\PurchaseOrder;
use App\Http\Recopro\PurchaseOrder\PurchaseOrderInterface;
use App\Http\Recopro\PurchaseOrder\PurchaseOrderRepository;
use App\Http\Recopro\PurchaseOrderDetail\PurchaseOrderDetail;
use App\Http\Recopro\PurchaseOrderDetail\PurchaseOrderDetailInterface;
use App\Http\Recopro\PurchaseOrderDetail\PurchaseOrderDetailRepository;
use App\Http\Recopro\Quotation\Quotation;
use App\Http\Recopro\Quotation\QuotationInterface;
use App\Http\Recopro\Quotation\QuotationRepository;
use App\Http\Recopro\QuotationState\QuotationState;
use App\Http\Recopro\QuotationState\QuotationStateInterface;
use App\Http\Recopro\QuotationState\QuotationStateRepository;
use App\Http\Recopro\ReceptionTransfer\ReceptionTransfer;
use App\Http\Recopro\ReceptionTransfer\ReceptionTransferInterface;
use App\Http\Recopro\ReceptionTransfer\ReceptionTransferRepository;
use App\Http\Recopro\ReceptionTransferProduct\ReceptionTransferProduct;
use App\Http\Recopro\ReceptionTransferProduct\ReceptionTransferProductInterface;
use App\Http\Recopro\ReceptionTransferProduct\ReceptionTransferProductRepository;
use App\Http\Recopro\ReferralGuide\ReferralGuide;
use App\Http\Recopro\ReferralGuide\ReferralGuideInterface;
use App\Http\Recopro\ReferralGuide\ReferralGuideRepository;
use App\Http\Recopro\ReferralGuideProduct\ReferralGuideProduct;
use App\Http\Recopro\ReferralGuideProduct\ReferralGuideProductInterface;
use App\Http\Recopro\ReferralGuideProduct\ReferralGuideProductRepository;
use App\Http\Recopro\Requirement\Requirement;
use App\Http\Recopro\Requirement\RequirementInterface;
use App\Http\Recopro\Requirement\RequirementRepository;
use App\Http\Recopro\RequirementDetail\RequirementDetail;
use App\Http\Recopro\RequirementDetail\RequirementDetailInterface;
use App\Http\Recopro\RequirementDetail\RequirementDetailRepository;
use App\Http\Recopro\RequirementLineState\RequirementLineState;
use App\Http\Recopro\RequirementLineState\RequirementLineStateInterface;
use App\Http\Recopro\RequirementLineState\RequirementLineStateRepository;
use App\Http\Recopro\RequirementState\RequirementState;
use App\Http\Recopro\RequirementState\RequirementStateInterface;
use App\Http\Recopro\RequirementState\RequirementStateRepository;
use App\Http\Recopro\Product\Product;
use App\Http\Recopro\Product\ProductRepository;
use App\Http\Recopro\Stock\Stock;
use App\Http\Recopro\Stock\StockInterface;
use App\Http\Recopro\Stock\StockRepository;
use App\Http\Recopro\SubProject\SubProject;
use App\Http\Recopro\SubProject\SubProjectInterface;
use App\Http\Recopro\SubProject\SubProjectRepository;
use App\Http\Recopro\SubProjectFront\SubProjectFront;
use App\Http\Recopro\SubProjectFront\SubProjectFrontInterface;
use App\Http\Recopro\SubProjectFront\SubProjectFrontRepository;
use App\Http\Recopro\SubProjectFrontDetail\SubProjectFrontDetail;
use App\Http\Recopro\SubProjectFrontDetail\SubProjectFrontDetailInterface;
use App\Http\Recopro\SubProjectFrontDetail\SubProjectFrontDetailRepository;
use App\Http\Recopro\SubProjectFrontDetailAPU\SubProjectFrontDetailAPU;
use App\Http\Recopro\SubProjectFrontDetailAPU\SubProjectFrontDetailAPUInterface;
use App\Http\Recopro\SubProjectFrontDetailAPU\SubProjectFrontDetailAPURepository;
use App\Http\Recopro\SubProjectLevel\SubProjectLevel;
use App\Http\Recopro\SubProjectLevel\SubProjectLevelInterface;
use App\Http\Recopro\SubProjectLevel\SubProjectLevelRepository;
use App\Http\Recopro\Transfer\Transfer;
use App\Http\Recopro\Transfer\TransferInterface;
use App\Http\Recopro\Transfer\TransferRepository;
use App\Http\Recopro\TransferDetail\TransferDetail;
use App\Http\Recopro\TransferDetail\TransferDetailInterface;
use App\Http\Recopro\TransferDetail\TransferDetailRepository;
use App\Http\Recopro\TransferProduct\TransferProduct;
use App\Http\Recopro\TransferProduct\TransferProductInterface;
use App\Http\Recopro\TransferProduct\TransferProductRepository;
use App\Http\Recopro\Type\TypeInterface;
use App\Http\Recopro\TypeChange\TypeChangeInterface;
use App\Http\Recopro\TypeDocumentIdentity\TypeDocumentIdentityInterface;
use App\Http\Recopro\TypePerson\TypePersonInterface;
use App\Http\Recopro\TypeRetention\TypeRetentionInterface;
use App\Http\Recopro\Unity\UnityInterface;
use App\Http\Recopro\User\UserInterface;
use App\Http\Recopro\UserPassword\UserPassword;
use App\Http\Recopro\UserPassword\UserPasswordInterface;
use App\Http\Recopro\UserPassword\UserPasswordRepository;
use App\Http\Recopro\Warehouse\Warehouse;
use App\Http\Recopro\Warehouse\WarehouseInterface;
use App\Http\Recopro\Warehouse\WarehouseRepository;
use App\Http\Recopro\Type\Type;
use App\Http\Recopro\Type\TypeRepository;
use App\Http\Recopro\TypeChange\TypeChange;
use App\Http\Recopro\TypeChange\TypeChangeRepository;
use App\Http\Recopro\Level\Level;
use App\Http\Recopro\Level\LevelRepository;
use App\Http\Recopro\Profile\Profile;
use App\Http\Recopro\Profile\ProfileRepository;
use App\Http\Recopro\TypeDocumentIdentity\TypeDocumentIdentity;
use App\Http\Recopro\TypeDocumentIdentity\TypeDocumentIdentityRepository;
use App\Http\Recopro\TypePerson\TypePerson;
use App\Http\Recopro\TypePerson\TypePersonRepository;
use App\Http\Recopro\TypeRetention\TypeRetention;
use App\Http\Recopro\TypeRetention\TypeRetentionRepository;
use App\Http\Recopro\User\User;
use App\Http\Recopro\User\UserRepository;
use App\Http\Recopro\Buyer\Buyer;
use App\Http\Recopro\Buyer\BuyerRepository;
use App\Http\Recopro\Front\Front;
use App\Http\Recopro\Front\FrontRepository;
use App\Http\Recopro\WarehouseUser\WarehouseUser;
use App\Http\Recopro\WarehouseUser\WarehouseUserInterface;
use App\Http\Recopro\WarehouseUser\WarehouseUserRepository;
use App\Http\Recopro\Config\Config;
use App\Http\Recopro\Config\ConfigRepository;
use App\Http\Recopro\Unity\Unity;
use App\Http\Recopro\Unity\UnityRepository;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        view()->composer('app', MenuComposer::class);
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        // Module Security
        $this->registerProfile();
        $this->registerModule();
        $this->registerUser();
        $this->registerUserPassword();
        $this->registerPermission();
        $this->registerConfig();
        $this->registerParam();
        $this->registerApproverProject();
        $this->registerApproverProjectDetail();

        // Module Masters
        $this->registerBrand();
        $this->registerEntity();
        $this->registerTypePerson();
        $this->registerTypeDocumentIdentity();
        $this->registerType();
        $this->registerUnity();
        $this->registerTypeRetention();
        $this->registerProduct();
        $this->registerProductBrand();
        $this->registerPlanAccount();
        $this->registerLevel();
        $this->registerTypeChange();
        $this->registerWarehouse();
        $this->registerBuyer();
        $this->registerFront();
        $this->registerWarehouseUser();
        $this->registerPettyCash();
        $this->registerPettyCashUser();
        $this->registerPaymentCondition();
        $this->registerDocumentType();
        $this->registerMotiveTransfer();

        // Module Purchases
        $this->registerRequirement();
        $this->registerRequirementDetail();
        $this->registerRequirementState();
        $this->registerRequirementLineState();
        $this->registerApprovalAutonomy();
        $this->registerQuotation();
        $this->registerQuotationState();
        $this->registerContestRequirement();
        $this->registerContestConsolidated();
        $this->registerContestProvider();
        $this->registerContestProviderDetail();
        $this->registerCurrency();
        $this->registerMeasure();
        $this->registerShop();
        $this->registerCategory();
        $this->registerHeadAccountan();
        $this->registerOperation();
        $this->registerFamily();
        $this->registerSubFamily();
        $this->registerLot();
        $this->registerLocalizacion();
        $this->registerModelo();
        $this->registerRegister_Transfer_Articulo();
        $this->registerRegister_Transfer_Detalle();
        $this->registerQuery_stock();
		$this->registerQuery_movements();
        $this->registerOperation_Usuario();
        $this->registerAccoudet();
        $this->registerUbigeo();
        $this->registerSerie();
        $this->registerRegister_movement();
        $this->registerRegister_transfer();
        $this->registerGeneration_remision();
        $this->registerNaturaleza();
        $this->registerArticulo_Kit();
        $this->registerRegister_movement_Articulo();
        $this->registerRegister_movement_Detalle();
        $this->registerAlmacen_Stock_Localizacion();
        $this->registerContestApprovalAutonomy();
        $this->registerPurchaseOrder();
        $this->registerPurchaseOrderDetail();

        // Module Projects
        $this->registerProject();
        $this->registerProjectState();
        $this->registerProjectSubState();
        $this->registerProjectGGT();
        $this->registerProjectConsolidated();
        $this->registerSubProject();
        $this->registerSubProjectLevel();
        $this->registerSubProjectFront();
        $this->registerSubProjectFrontDetail();
        $this->registerSubProjectFrontDetailAPU();
        $this->registerAnalysisUnitaryPrice();

        // Module Warehouse
        $this->registerEntry();
        $this->registerEntryProduct();
        $this->registerDeparture();
        $this->registerDepartureProduct();
        $this->registerTransferDetail();
        $this->registerStock();
        $this->registerTransfer();
        $this->registerTransferProduct();
        $this->registerReferralGuide();
        $this->registerReferralGuideProduct();
        $this->registerReceptionTransfer();
        $this->registerReceptionTransferProduct();
        $this->registerConsumption();
        $this->registerConsumptionProduct();
        $this->registerConsumerReturn();
        $this->registerConsumerReturnProduct();
    }

    public function registerProfile()
    {
        $app = $this->app;

        $app->bind(ProfileInterface::class, function ($app) {
            return new ProfileRepository(new Profile());
        });
    }

    public function registerModule()
    {
        $app = $this->app;

        $app->bind(ModuleInterface::class, function ($app) {
            return new ModuleRepository(new Module());
        });
    }

    public function registerUser()
    {
        $app = $this->app;

        $app->bind(UserInterface::class, function ($app) {
            return new UserRepository(new User());
        });
    }

    public function registerUserPassword()
    {
        $app = $this->app;

        $app->bind(UserPasswordInterface::class, function ($app) {
            return new UserPasswordRepository(new UserPassword());
        });
    }

    public function registerPermission()
    {
        $app = $this->app;

        $app->bind(PermissionInterface::class, function ($app) {
            return new PermissionRepository(new Permission());
        });
    }

    public function registerConfig()
    {
        $app = $this->app;

        $app->bind(ConfigInterface::class, function ($app) {
            return new ConfigRepository(new Config());
        });
    }

    public function registerParam()
    {
        $app = $this->app;

        $app->bind(ParamInterface::class, function ($app) {
            return new ParamRepository(new Param());
        });
    }

    public function registerApproverProject()
    {
        $app = $this->app;

        $app->bind(ApproverProjectInterface::class, function ($app) {
            return new ApproverProjectRepository(new ApproverProject());
        });
    }

    public function registerApproverProjectDetail()
    {
        $app = $this->app;

        $app->bind(ApproverProjectDetailInterface::class, function ($app) {
            return new ApproverProjectDetailRepository(new ApproverProjectDetail());
        });
    }

    public function registerBrand()
    {
        $app = $this->app;

        $app->bind(BrandInterface::class, function ($app) {
            return new BrandRepository(new Brand());
        });
    }

    public function registerEntity()
    {
        $app = $this->app;

        $app->bind(EntityInterface::class, function ($app) {
            return new EntityRepository(new Entity());
        });
    }

    public function registerTypePerson()
    {
        $app = $this->app;

        $app->bind(TypePersonInterface::class, function ($app) {
            return new TypePersonRepository(new TypePerson());
        });
    }

    public function registerTypeDocumentIdentity()
    {
        $app = $this->app;

        $app->bind(TypeDocumentIdentityInterface::class, function ($app) {
            return new TypeDocumentIdentityRepository(new TypeDocumentIdentity());
        });
    }

    public function registerType()
    {
        $app = $this->app;

        $app->bind(TypeInterface::class, function ($app) {
            return new TypeRepository(new Type());
        });
    }

    public function registerUnity()
    {
        $app = $this->app;

        $app->bind(UnityInterface::class, function ($app) {
            return new UnityRepository(new Unity());
        });
    }

    public function registerTypeRetention()
    {
        $app = $this->app;

        $app->bind(TypeRetentionInterface::class, function ($app) {
            return new TypeRetentionRepository(new TypeRetention());
        });
    }

    public function registerPlanAccount()
    {
        $app = $this->app;

        $app->bind(PlanAccountInterface::class, function ($app) {
            return new PlanAccountRepository(new PlanAccount());
        });
    }

    public function registerLevel()
    {
        $app = $this->app;

        $app->bind(LevelInterface::class, function ($app) {
            return new LevelRepository(new Level());
        });
    }

    public function registerProduct()
    {
        $app = $this->app;

        $app->bind(ProductInterface::class, function ($app) {
            return new ProductRepository(new Product());
        });
    }

    public function registerProductBrand()
    {
        $app = $this->app;

        $app->bind(ProductBrandInterface::class, function ($app) {
            return new ProductBrandRepository(new ProductBrand());
        });
    }

    public function registerTypeChange()
    {
        $app = $this->app;

        $app->bind(TypeChangeInterface::class, function ($app) {
            return new TypeChangeRepository(new TypeChange());
        });
    }

    public function registerWarehouse()
    {
        $app = $this->app;

        $app->bind(WarehouseInterface::class, function ($app) {
            return new WarehouseRepository(new Warehouse());
        });
    }

    public function registerBuyer()
    {
        $app = $this->app;

        $app->bind(BuyerInterface::class, function ($app) {
            return new BuyerRepository(new Buyer());
        });
    }

    public function registerFront()
    {
        $app = $this->app;

        $app->bind(FrontInterface::class, function ($app) {
            return new FrontRepository(new Front());
        });
    }

    public function registerWarehouseUser()
    {
        $app = $this->app;

        $app->bind(WarehouseUserInterface::class, function ($app) {
            return new WarehouseUserRepository(new WarehouseUser());
        });
    }

    public function registerRequirement()
    {
        $app = $this->app;

        $app->bind(RequirementInterface::class, function ($app) {
            return new RequirementRepository(new Requirement());
        });
    }

    public function registerRequirementDetail()
    {
        $app = $this->app;

        $app->bind(RequirementDetailInterface::class, function ($app) {
            return new RequirementDetailRepository(new RequirementDetail());
        });
    }

    public function registerRequirementState()
    {
        $app = $this->app;

        $app->bind(RequirementStateInterface::class, function ($app) {
            return new RequirementStateRepository(new RequirementState());
        });
    }

    public function registerRequirementLineState()
    {
        $app = $this->app;

        $app->bind(RequirementLineStateInterface::class, function ($app) {
            return new RequirementLineStateRepository(new RequirementLineState());
        });
    }

    public function registerProject()
    {
        $app = $this->app;

        $app->bind(ProjectInterface::class, function ($app) {
            return new ProjectRepository(new Project());
        });
    }

    public function registerProjectState()
    {
        $app = $this->app;

        $app->bind(ProjectStateInterface::class, function ($app) {
            return new ProjectStateRepository(new ProjectState());
        });
    }

    public function registerProjectSubState()
    {
        $app = $this->app;

        $app->bind(ProjectSubStateInterface::class, function ($app) {
            return new ProjectSubStateRepository(new ProjectSubState());
        });
    }

    public function registerProjectGGT()
    {
        $app = $this->app;

        $app->bind(ProjectGGTInterface::class, function ($app) {
            return new ProjectGGTRepository(new ProjectGGT());
        });
    }

    public function registerProjectConsolidated()
    {
        $app = $this->app;

        $app->bind(ProjectConsolidatedInterface::class, function ($app) {
            return new ProjectConsolidatedRepository(new ProjectConsolidated());
        });
    }

    public function registerSubProject()
    {
        $app = $this->app;

        $app->bind(SubProjectInterface::class, function ($app) {
            return new SubProjectRepository(new SubProject());
        });
    }

    public function registerSubProjectLevel()
    {
        $app = $this->app;

        $app->bind(SubProjectLevelInterface::class, function ($app) {
            return new SubProjectLevelRepository(new SubProjectLevel());
        });
    }

    public function registerSubProjectFront()
    {
        $app = $this->app;

        $app->bind(SubProjectFrontInterface::class, function ($app) {
            return new SubProjectFrontRepository(new SubProjectFront());
        });
    }

    public function registerSubProjectFrontDetail()
    {
        $app = $this->app;

        $app->bind(SubProjectFrontDetailInterface::class, function ($app) {
            return new SubProjectFrontDetailRepository(new SubProjectFrontDetail());
        });
    }

    public function registerSubProjectFrontDetailAPU()
    {
        $app = $this->app;

        $app->bind(SubProjectFrontDetailAPUInterface::class, function ($app) {
            return new SubProjectFrontDetailAPURepository(new SubProjectFrontDetailAPU());
        });
    }

    public function registerAnalysisUnitaryPrice()
    {
        $app = $this->app;

        $app->bind(AnalysisUnitaryPriceInterface::class, function ($app) {
            return new AnalysisUnitaryPriceRepository(new AnalysisUnitaryPrice());
        });
    }

    public function registerApprovalAutonomy()
    {
        $app = $this->app;

        $app->bind(Approval_autonomyInterface::class, function ($app) {
            return new Approval_autonomyRepository(new Approval_autonomy());
        });
    }

    public function registerQuotation()
    {
        $app = $this->app;

        $app->bind(QuotationInterface::class, function ($app) {
            return new QuotationRepository(new Quotation());
        });
    }

    public function registerQuotationState()
    {
        $app = $this->app;

        $app->bind(QuotationStateInterface::class, function ($app) {
            return new QuotationStateRepository(new QuotationState());
        });
    }

    public function registerContestRequirement()
    {
        $app = $this->app;

        $app->bind(ContestRequirementInterface::class, function ($app) {
            return new ContestRequirementRepository(new ContestRequirement());
        });
    }

    public function registerContestConsolidated()
    {
        $app = $this->app;

        $app->bind(ContestConsolidatedInterface::class, function ($app) {
            return new ContestConsolidatedRepository(new ContestConsolidated());
        });
    }

    public function registerContestProvider()
    {
        $app = $this->app;

        $app->bind(ContestProviderInterface::class, function ($app) {
            return new ContestProviderRepository(new ContestProvider());
        });
    }

    public function registerContestProviderDetail()
    {
        $app = $this->app;

        $app->bind(ContestProviderDetailInterface::class, function ($app) {
            return new ContestProviderDetailRepository(new ContestProviderDetail());
        });
    }

    public function registerCurrency()
    {
        $app = $this->app;

        $app->bind(CurrencyInterface::class, function ($app) {
            return new CurrencyRepository(new Currency());
        });
    }

    public function registerMeasure()
    {
        $app = $this->app;

        $app->bind(MeasureInterface::class, function ($app) {
            return new MeasureRepository(new Measure());
        });
    }

    public function registerShop()
    {
        $app = $this->app;

        $app->bind(ShopInterface::class, function ($app) {
            return new ShopRepository(new Shop());
        });
    }

    public function registerCategory()
    {
        $app = $this->app;

        $app->bind(CategoryInterface::class, function ($app) {
            return new CategoryRepository(new Category());
        });
    }

    public function registerHeadAccountan()
    {
        $app = $this->app;

        $app->bind(HeadAccountanInterface::class, function ($app) {
            return new HeadAccountanRepository(new HeadAccountan());
        });
    }

     public function registerOperation()
    {
        $app = $this->app;

        $app->bind(OperationInterface::class, function ($app) {
            return new OperationRepository(new Operation());
        });
    }

      public function registerFamily()
    {
        $app = $this->app;

        $app->bind(FamilyInterface::class, function ($app) {
            return new FamilyRepository(new Family());
        });
    }
      public function registerSubFamily()
    {
        $app = $this->app;

        $app->bind(SubFamilyInterface::class, function ($app) {
            return new SubFamilyRepository(new SubFamily());
        });
    }

     public function registerLot()
    {
        $app = $this->app;

        $app->bind(LotInterface::class, function ($app) {
            return new LotRepository(new Lot());
        });
    }
     public function registerLocalizacion()
    {
        $app = $this->app;

        $app->bind(LocalizacionInterface::class, function ($app) {
            return new LocalizacionRepository(new Localizacion());
        });
    }
     public function registerModelo()
    {
        $app = $this->app;

        $app->bind(ModeloInterface::class, function ($app) {
            return new ModeloRepository(new Modelo());
        });
    }
    public function registerRegister_Transfer_Articulo()
    {
        $app = $this->app;

        $app->bind(Register_Transfer_ArticuloInterface::class, function ($app) {
            return new Register_Transfer_ArticuloRepository(new Register_Transfer_Articulo());
        });
    }
    public function registerRegister_Transfer_Detalle()
    {
        $app = $this->app;

        $app->bind(Register_Transfer_DetalleInterface::class, function ($app) {
            return new Register_Transfer_DetalleRepository(new Register_Transfer_Detalle());
        });
    }
     public function registerOperation_Usuario()
    {
        $app = $this->app;

        $app->bind(Operation_UsuarioInterface::class, function ($app) {
            return new Operation_UsuarioRepository(new Operation_Usuario());
        });
    }
    public function registerAccoudet()
    {
        $app = $this->app;

        $app->bind(AccoudetInterface::class, function ($app) {
            return new AccoudetRepository(new Accoudet());
        });
    }
    public function registerUbigeo()
    {
        $app = $this->app;

        $app->bind(UbigeoInterface::class, function ($app) {
            return new UbigeoRepository(new Ubigeo());
        });
    }
    public function registerSerie()
    {
        $app = $this->app;

        $app->bind(SerieInterface::class, function ($app) {
            return new SerieRepository(new Serie());
        });
    }
    public function registerRegister_movement()
    {
        $app = $this->app;

        $app->bind(Register_movementInterface::class, function ($app) {
            return new Register_movementRepository(new Register_movement());
        });
    }
    public function registerRegister_transfer()
    {
        $app = $this->app;

        $app->bind(Register_transferInterface::class, function ($app) {
            return new Register_transferRepository(new Register_transfer());
        });
    }
    public function registerQuery_stock()
    {
        $app = $this->app;

        $app->bind(Query_stockInterface::class, function ($app) {
            return new Query_stockRepository(new Query_stock());
        });
    }
    public function registerQuery_movements()
    {
        $app = $this->app;

        $app->bind(Query_movementsInterface::class, function ($app) {
            return new Query_movementsRepository(new Query_movements());
        });
    }
    public function registerGeneration_remision()
    {
        $app = $this->app;

        $app->bind(Generation_remisionInterface::class, function ($app) {
            return new Generation_remisionRepository(new Generation_remision());
        });
    }
    public function registerNaturaleza()
    {
        $app = $this->app;

        $app->bind(NaturalezaInterface::class, function ($app) {
            return new NaturalezaRepository(new Naturaleza());
        });
    }
    public function registerArticulo_Kit()
    {
        $app = $this->app;

        $app->bind(Articulo_KitInterface::class, function ($app) {
            return new Articulo_KitRepository(new Articulo_Kit());
        });
    }
    public function registerRegister_movement_Articulo()
    {
        $app = $this->app;

        $app->bind(Register_movement_ArticuloInterface::class, function ($app) {
            return new Register_movement_ArticuloRepository(new Register_movement_Articulo());
        });
    }
    public function registerRegister_movement_Detalle()
    {
        $app = $this->app;

        $app->bind(Register_movement_DetalleInterface::class, function ($app) {
            return new Register_movement_DetalleRepository(new Register_movement_Detalle());
        });
    }
    public function registerAlmacen_Stock_Localizacion()
    {
        $app = $this->app;

        $app->bind(Almacen_Stock_LocalizacionInterface::class, function ($app) {
            return new Almacen_Stock_LocalizacionRepository(new Almacen_Stock_Localizacion());
        });
    }
    public function registerEntry()
    {
        $app = $this->app;

        $app->bind(EntryInterface::class, function ($app) {
            return new EntryRepository(new Entry());
        });
    }

    public function registerEntryProduct()
    {
        $app = $this->app;

        $app->bind(EntryProductInterface::class, function ($app) {
            return new EntryProductRepository(new EntryProduct());
        });
    }

    public function registerDeparture()
    {
        $app = $this->app;

        $app->bind(DepartureInterface::class, function ($app) {
            return new DepartureRepository(new Departure());
        });
    }

    public function registerDepartureProduct()
    {
        $app = $this->app;

        $app->bind(DepartureProductInterface::class, function ($app) {
            return new DepartureProductRepository(new DepartureProduct());
        });
    }

    public function registerTransferDetail()
    {
        $app = $this->app;

        $app->bind(TransferDetailInterface::class, function ($app) {
            return new TransferDetailRepository(new TransferDetail());
        });
    }

    public function registerStock()
    {
        $app = $this->app;

        $app->bind(StockInterface::class, function ($app) {
            return new StockRepository(new Stock());
        });
    }

    public function registerPettyCash()
    {
        $app = $this->app;

        $app->bind(Petty_cashInterface::class, function ($app) {
            return new Petty_cashRepository(new Petty_cash());
        });
    }

    public function registerPettyCashUser()
    {
        $app = $this->app;

        $app->bind(Petty_cashUserInterface::class, function ($app) {
            return new Petty_cashUserRepository(new Petty_cashUser());
        });
    }

    public function registerPaymentCondition()
    {
        $app = $this->app;

        $app->bind(PaymentConditionInterface::class, function ($app) {
            return new PaymentConditionRepository(new PaymentCondition());
        });
    }

    public function registerTransfer()
    {
        $app = $this->app;

        $app->bind(TransferInterface::class, function ($app) {
            return new TransferRepository(new Transfer());
        });
    }

    public function registerTransferProduct()
    {
        $app = $this->app;

        $app->bind(TransferProductInterface::class, function ($app) {
            return new TransferProductRepository(new TransferProduct());
        });
    }

    public function registerDocumentType()
    {
        $app = $this->app;

        $app->bind(DocumentTypeInterface::class, function ($app) {
            return new DocumentTypeRepository(new DocumentType());
        });
    }

    public function registerMotiveTransfer()
    {
        $app = $this->app;

        $app->bind(MotiveTransferInterface::class, function ($app) {
            return new MotiveTransferRepository(new MotiveTransfer());
        });
    }

    public function registerReferralGuide()
    {
        $app = $this->app;

        $app->bind(ReferralGuideInterface::class, function ($app) {
            return new ReferralGuideRepository(new ReferralGuide());
        });
    }

    public function registerReferralGuideProduct()
    {
        $app = $this->app;

        $app->bind(ReferralGuideProductInterface::class, function ($app) {
            return new ReferralGuideProductRepository(new ReferralGuideProduct());
        });
    }

    public function registerReceptionTransfer()
    {
        $app = $this->app;

        $app->bind(ReceptionTransferInterface::class, function ($app) {
            return new ReceptionTransferRepository(new ReceptionTransfer());
        });
    }

    public function registerReceptionTransferProduct()
    {
        $app = $this->app;

        $app->bind(ReceptionTransferProductInterface::class, function ($app) {
            return new ReceptionTransferProductRepository(new ReceptionTransferProduct());
        });
    }

    public function registerConsumption()
    {
        $app = $this->app;

        $app->bind(ConsumptionInterface::class, function ($app) {
            return new ConsumptionRepository(new Consumption());
        });
    }

    public function registerConsumptionProduct()
    {
        $app = $this->app;

        $app->bind(ConsumptionProductInterface::class, function ($app) {
            return new ConsumptionProductRepository(new ConsumptionProduct());
        });
    }

    public function registerConsumerReturn()
    {
        $app = $this->app;

        $app->bind(ConsumerReturnInterface::class, function ($app) {
            return new ConsumerReturnRepository(new ConsumerReturn());
        });
    }

    public function registerConsumerReturnProduct()
    {
        $app = $this->app;

        $app->bind(ConsumerReturnProductInterface::class, function ($app) {
            return new ConsumerReturnProductRepository(new ConsumerReturnProduct());
        });
    }

    public function registerContestApprovalAutonomy()
    {
        $app = $this->app;
        $app->bind(ContestAutonomyApprovalInterface::class, function ($app) {
            return new ContestAutonomyApprovalRepository(new  ContestAutonomyApproval());
        });
    }

    public function registerPurchaseOrder()
    {
        $app = $this->app;
        $app->bind(PurchaseOrderInterface::class, function ($app) {
            return new PurchaseOrderRepository(new PurchaseOrder());
        });
    }

    public function registerPurchaseOrderDetail()
    {
        $app = $this->app;
        $app->bind(PurchaseOrderDetailInterface::class, function ($app) {
            return new PurchaseOrderDetailRepository(new PurchaseOrderDetail());
        });
    }
}













